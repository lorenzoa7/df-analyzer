import { z } from 'zod'

export const tasksElementsSchema = z.object({
  tasksElementsList: z
    .array(
      z.object({
        taskId: z.coerce.number(),
        outputElements: z.array(
          z.object({
            attributeId: z.coerce.number(),
            variableName: z.string().nonempty('This field is required.'),
          }),
        ),
        inputElements: z.array(
          z.object({
            inputId: z.coerce.number(),
            attributeId: z.coerce.number(),
            variableName: z.string().nonempty('This field is required.'),
          }),
        ),
      }),
    )
    .min(1, 'You should set at least one output attribute.'),
})

export type TasksElementsData = z.infer<typeof tasksElementsSchema>
