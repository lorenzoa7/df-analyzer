import { z } from 'zod'

export const outputsSchema = z.object({
  outputs: z
    .array(
      z.object({
        name: z.string().nonempty('This field is required.'),
        transformationId: z.coerce.number({
          invalid_type_error: 'This is required bro!',
        }),
      }),
    )
    .min(1, 'You should set at least one output.'),
})

export type OutputsData = z.infer<typeof outputsSchema>
