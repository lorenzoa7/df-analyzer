'use client'

import useTask from '@/hooks/useTask'
import { TaskData, taskSchema } from '@/schemas/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function TaskDialog() {
  const { openTaskDialog, setOpenTaskDialog } = useTask()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({
    mode: 'onSubmit',
    resolver: zodResolver(taskSchema),
    defaultValues: {
      transformationId: -1,
      outputElement: [],
      inputElement: [],
    },
  })

  const onSubmit = (data: TaskData) => {
    console.log(data)
  }

  return (
    <Dialog
      open={openTaskDialog}
      onClose={() => setOpenTaskDialog(false)}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}></form>
      </DialogContent>
    </Dialog>
  )
}
