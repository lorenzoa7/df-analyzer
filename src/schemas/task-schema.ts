import useGeneral from '@/hooks/useGeneral'
import { z } from 'zod'

export const useTaskSchema = () => {
  const { appData } = useGeneral()
  const taskSchema = z.object({
    name: z
      .string()
      .nonempty('You have to provide a name.')
      .refine(
        (value) => !appData.tasks.some((task) => task.name === value),
        'This name is already in use by another task.',
      ),
    transformationId: z.coerce.number(),
    inputId: z.coerce.number(),
    inputElement: z
      .array(
        z.object({
          variableName: z.string().nonempty('You should select the variable.'),
        }),
      )
      .or(z.null())
      .transform((array) => (array && array?.length < 1 ? null : array)),
    outputElement: z.array(
      z.object({
        variableName: z.string().nonempty('You should select the variable.'),
      }),
    ),
  })

  return taskSchema
}

export type TaskData = z.infer<ReturnType<typeof useTaskSchema>>
