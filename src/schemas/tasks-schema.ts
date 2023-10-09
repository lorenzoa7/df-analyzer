import { z } from 'zod'

export const tasksSchema = z.object({
  tasksList: z
    .array(
      z.object({
        transformationId: z.coerce.number(),
        tasks: z.array(
          z.object({
            _id: z.coerce.number(),
            name: z.string().nonempty('This field is required.'),
            inputId: z.coerce.number(),
          }),
        ),
      }),
    )
    .min(1, 'You should set at least one output attribute.'),
})

export type TasksData = z.infer<typeof tasksSchema>
