// src/features/edge/EdgeSearchBar.tsx

import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useRecoilState } from 'recoil'

import { EDGE_STATUS_OPTIONS, RECORDING_STATUS_OPTIONS, SORT_OPTIONS, searchInputValue, searchSelectRecordingStatusValue, searchSelectStatusValue, sortInputValue } from 'models/edge'
const EdgeSearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchInputValue)
  const [selectStatus, setSelectStatus] = useRecoilState(searchSelectStatusValue)
  const [recordingStatusValue, setRecordingStatusValue] = useRecoilState(searchSelectRecordingStatusValue)
  const [sortValue, setSortValue] = useRecoilState(sortInputValue)

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '1rem', gap: '1rem' }}
    >
      <Select
        value={selectStatus}
        onChange={(event) => { setSelectStatus(event.target.value as keyof typeof EDGE_STATUS_OPTIONS) }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ minWidth: '130px' }}
      >
        <MenuItem value="">ステータス (全て)</MenuItem>
        {Object.entries(EDGE_STATUS_OPTIONS).map((option) => (
          <MenuItem value={option[0]} key={option[0]}>{option[1]}</MenuItem>
        ))}
      </Select>

      <Select
        value={recordingStatusValue}
        onChange={(event) => { setRecordingStatusValue(event.target.value as keyof typeof RECORDING_STATUS_OPTIONS) }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ minWidth: '130px' }}
      >
        <MenuItem value="">録画状況 (全て)</MenuItem>
        {Object.entries(RECORDING_STATUS_OPTIONS).map((option) => (
          <MenuItem value={option[0]} key={option[0]}>{option[1]}</MenuItem>
        ))}
      </Select>

      <TextField
        value={searchValue}
        onChange={(event) => { setSearchValue(event.target.value) } }
        placeholder='thingName・テナント名で検索'
        sx={{ flex: '1 1 auto' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Select
        value={sortValue}
        onChange={(event) => { setSortValue(event.target.value as keyof typeof SORT_OPTIONS) }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ minWidth: '130px' }}
      >
        {Object.entries(SORT_OPTIONS).map((options) => (
          <MenuItem value={options[0]} key={options[0]}>{options[1]}</MenuItem>
        )
        )}
      </Select>
    </Stack>
  )
}

export default EdgeSearchBar
