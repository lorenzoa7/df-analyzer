'use client'

import useTask from '@/hooks/useTask'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

export default function TransformationDialog() {
  const { openTaskDialog, setOpenTaskDialog } = useTask()
  return (
    <Dialog
      open={openTaskDialog}
      onClose={() => setOpenTaskDialog(false)}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  )
}
