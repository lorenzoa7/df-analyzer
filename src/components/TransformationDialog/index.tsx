'use client'

import useTransformation from '@/hooks/useTransformation'
import { Transformation } from '@/utils/types'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import TransformationForm from './TransformationForm'

export default function TransformationDialog({
  id,
  name,
  output,
  inputs,
}: Transformation) {
  const { openTransformationDialog, setOpenTransformationDialog } =
    useTransformation()

  return (
    <Dialog
      open={openTransformationDialog}
      onClose={() => setOpenTransformationDialog(false)}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Create new transformation</DialogTitle>
      <DialogContent>
        <TransformationForm
          id={id}
          name={name}
          output={output}
          inputs={inputs}
        />
      </DialogContent>
    </Dialog>
  )
}
