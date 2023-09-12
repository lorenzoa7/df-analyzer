import { z } from 'zod'

export const taskSchema = z.object({
  transformationId: z.coerce.number(),
  outputElement: z.array(
    z.object({
      element: z.string().nonempty('You should select the variable.'),
    }),
  ),
  inputElement: z
    .array(
      z.object({
        element: z.string().nonempty('You should select the variable.'),
      }),
    )
    .optional(),
})

export type TaskData = z.infer<typeof taskSchema>
