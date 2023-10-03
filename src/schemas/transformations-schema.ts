import { z } from 'zod'

export const transformationsSchema = z.object({
  transformations: z
    .array(
      z.object({
        name: z.string().nonempty('This field is required.'),
      }),
    )
    .min(1, 'You should set at least one transformation.'),
})

export type TransformationsData = z.infer<typeof transformationsSchema>
