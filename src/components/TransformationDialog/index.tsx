'use client'

import useData from '@/hooks/useData'
import { Transformation } from '@/utils/types'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import TransformationForm from './TransformationForm'

export default function TransformationDialog({
  id,
  name,
  output,
  inputs,
}: Transformation) {
  const { openTransformationDialog, setOpenTransformationDialog } = useData()

  return (
    <Dialog
      open={openTransformationDialog}
      onClose={() => setOpenTransformationDialog(false)}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Create new transformation</DialogTitle>
      <DialogContent>
        <TransformationForm />
      </DialogContent>
    </Dialog>
  )
}
