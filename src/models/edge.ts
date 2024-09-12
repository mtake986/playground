// src/models/edge.ts

import { atom, selector, selectorFamily } from 'recoil'

import { servicesSelector } from './service'

import { type GodEdgeSum } from 'jizaipad-api-sdk-local/modules/Edge'

export const transformDateFromString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export const tenantIdState = atom<string>({
  key: 'tenantId',
  default: ''
})

export const searchInputValue = atom({
  key: 'searchInputValue',
  default: ''
})

export const searchSelectStatusValue = atom<keyof typeof EDGE_STATUS_OPTIONS | ''>({
  key: 'searchSelectStatusValue',
  default: ''
})

export const searchSelectRecordingStatusValue = atom<keyof typeof RECORDING_STATUS_OPTIONS | ''>({
  key: 'searchSelectRecordingStatusValue',
  default: ''
})

export const sortInputValue = atom<keyof typeof SORT_OPTIONS>({
  key: 'sortInputValue',
  default: 'tenantAsc'
})

export const SORT_OPTIONS = {
  tenantAsc: 'テナント名昇順',
  cameraAsc: 'カメラ昇順',
  thingNameAsc: 'thingName昇順',
} as const

export const EDGE_STATUS_OPTIONS = {
  alive: 'オンライン',
  dead: 'オフライン',
  unknown: '不明'
} as const

export const RECORDING_STATUS_OPTIONS = {
  active: '録画中',
  inactive: '録画停止中',
  disabled: '非稼働',
  unknown: '不明'
} as const

export const resetState = atom({
  key: 'resetEdges',
  default: 0
})

export const edgesQuery = selector<GodEdgeSum[] | undefined>({
  key: 'edges',
  get: async ({ get }) => {
    const { edgeService } = get(servicesSelector)
    const res = await edgeService.godFetch()
    return res
  }
})

const searchedEdges = selector<GodEdgeSum[] | undefined>({
  key: 'searchedEdges',
  get: ({ get }) => {
    const edges = get(edgesQuery)
    const value = get(searchInputValue)?.toLowerCase() ?? ''
    const status = get(searchSelectStatusValue)
    const recordingStatus = get(searchSelectRecordingStatusValue)

    if (edges === undefined) return []

    return edges.filter((edge) => {
      return (
        filterByValue(edge, value) &&
        filterByStatus(edge, status) &&
        filterByRecordingStatus(edge, recordingStatus)
      )
    })
  }
})

export const searchedEdgesWithCount = selector<number>({
  key: 'searchedEdgesWithCount',
  get: ({ get }) => {
    const edges = get(searchedEdges)
    return edges?.length ?? 0
  }
})

export const searchedAndSortedEdges = selector<GodEdgeSum[]>({
  key: 'searchedAndFilteredEdges',
  get: ({ get }) => {
    const edges = get(searchedEdges)
    return edges ?? []
  }
})

export const selectEdgeFromEdgeId = selectorFamily<GodEdgeSum | undefined, GodEdgeSum['id']>({
  key: 'edge',
  get: (id) => ({ get }) => {
    const edges = get(edgesQuery)
    return edges?.find((edge) => edge.id === id)
  }
})

// PRIVATE FUN
const filterByValue = (edge: GodEdgeSum, value: string): boolean => {
  return (value !== '' ? (edge.thingName.toLowerCase().includes(value) || edge.tenant?.name?.toLowerCase().includes(value)) : true)
}

const filterByStatus = (edge: GodEdgeSum, status: keyof typeof EDGE_STATUS_OPTIONS | ''): boolean => {
  return ((status === 'unknown') ? edge.edgeCondition?.status === undefined : (status !== '') ? edge.edgeCondition?.status === status : true)
}

const filterByRecordingStatus = (edge: GodEdgeSum, recordingStatus: keyof typeof RECORDING_STATUS_OPTIONS | ''): boolean => {
  return ((recordingStatus === 'unknown') ? edge.edgeCondition?.recordingStatus === undefined : (recordingStatus !== '') ? edge.edgeCondition?.recordingStatus === recordingStatus : true)
}
