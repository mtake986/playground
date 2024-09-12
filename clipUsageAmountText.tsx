import { Typography } from '@mui/material'
import React from 'react'
import { RootState, useSelector } from 'redux/store'
import { clipsLengthSelector } from './clipState'
import { useRecoilValue } from 'recoil'

const ClipUsageAmountText: React.FC = () => {
  const { userMe } = useSelector((state: RootState) => state.user)
  const clipsLength = useRecoilValue(clipsLengthSelector)
  const clipContractedCapacity = userMe?.clipContractedCapacity
  const clipUsedCapacity = userMe?.clipUsedCapacity

  const clipContractedCapacityGB = Math.round(clipContractedCapacity / 1024 / 1024 / 1024 * 10) / 10
  const clipUsedCapacityGB = Math.round(clipUsedCapacity / 1024 / 1024 / 1024 * 10) / 10

  return (
    <Typography variant='subtitle1' sx={{ px: '1rem' }}>
      {clipsLength}本のクリップ (合計使用容量 {clipUsedCapacityGB} / {clipContractedCapacityGB}GB)
    </Typography>
  )
}

export default ClipUsageAmountText
