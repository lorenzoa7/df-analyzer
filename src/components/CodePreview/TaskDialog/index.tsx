'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function TaskDialog() {
  const { openTaskDialog, setOpenTaskDialog } = useTask()
  const { appData } = useGeneral()

  const form = useForm<TaskData>({
    mode: 'onSubmit',
    resolver: zodResolver(taskSchema),
    defaultValues: {
      transformationId: 1,
      outputElement: [],
      inputElement: [],
    },
  })

  const onSubmit = (data: TaskData) => {
    console.log(data)
  }

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-5 p-5"
          >
            <FormField
              control={form.control}
              name="transformationId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select the transformation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the transformation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appData.transformations.map((transformation) => (
                        <SelectItem
                          key={transformation.id}
                          value={String(transformation.id)}
                        >
                          {transformation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-1/2">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
