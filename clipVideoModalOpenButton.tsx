import React, { useState } from 'react'
import { Button } from '@mui/material'
import VideoClipInfoDialog from './VideoClipInfoDialog'

const ClipVideoModalOpenBtn: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Clip Info
      </Button>
      <VideoClipInfoDialog open={open} onClose={handleClose} />
    </div>
  )
}

export default ClipVideoModalOpenBtn
