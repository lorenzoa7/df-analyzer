import { z } from 'zod'

export const taskSchema = z.object({
  transformationId: z.coerce.number(),
  outputElement: z.array(
    z.object({
      variableName: z.string().nonempty('You should select the variable.'),
    }),
  ),
  inputId: z.coerce.number(),
  inputElement: z
    .array(
      z.object({
        variableName: z.string().nonempty('You should select the variable.'),
      }),
    )
    .optional(),
})

export type TaskData = z.infer<typeof taskSchema>
