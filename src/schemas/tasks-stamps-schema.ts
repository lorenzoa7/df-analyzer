import { stamps } from '@/config/data'
import { z } from 'zod'

export const tasksStampsSchema = z.object({
  codeLinesList: z
    .array(
      z
        .object({
          type: z.literal('stamp'),
          taskId: z.coerce.number(),
          transformationId: z.coerce.number(),
          stamp: z.enum(stamps),
        })
        .or(
          z.object({
            type: z.literal('code'),
            code: z.string(),
          }),
        ),
    )
    .min(1, 'The code needs to have at least one line.'),
})

export type TasksStampsData = z.infer<typeof tasksStampsSchema>
