'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useGeneral from '@/hooks/useGeneral'
import useTask from '@/hooks/useTask'
import { TaskData, taskSchema } from '@/schemas/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function TaskDialog() {
  const { openTaskDialog, setOpenTaskDialog } = useTask()
  const { appData } = useGeneral()

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
      maxWidth={'sm'}
      className="z-10"
    >
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center p-10"
        >
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the transformation" />
            </SelectTrigger>
            <SelectContent>
              {appData.transformations.map((transformation) => (
                <SelectItem
                  key={transformation.id}
                  value={`(${transformation.id}) ${transformation.name}`}
                >
                  {`(${transformation.id}) ${transformation.name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
      </DialogContent>
    </Dialog>
  )
}
