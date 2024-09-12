import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Button,
  Box
} from '@mui/material'

interface VideoClipInfoDialogProps {
  open: boolean
  onClose: () => void
}

const VideoClipInfoDialog: React.FC<VideoClipInfoDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>クリップ動画情報</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>収録時間：</Typography>
            <Typography>2024-04-16 15:18 ～ 2024-04-16 15:28</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>カメラ名</Typography>
            <Typography>デモ1</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>エリア名</Typography>
            <Typography>デモカメラ</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>作成日時</Typography>
            <Typography>2024-04-16 15:28</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>作成者</Typography>
            <Typography>ジザイエ 運用担当4</Typography>
          </Box>

          <TextField
            label='タイトル*'
            defaultValue='2024/4/16 15:18:45 ～ 2024/4/16 15:28:45'
            variant='outlined'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button onClick={onClose}>閉じる</Button>
        <Button variant='contained' sx={{ marginLeft: 1 }}>更新</Button>
      </Box>
    </Dialog>
  )
}

export default VideoClipInfoDialog
