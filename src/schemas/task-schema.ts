import { z } from 'zod'

export const taskSchema = z.object({
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

export type TaskData = z.infer<typeof taskSchema>
