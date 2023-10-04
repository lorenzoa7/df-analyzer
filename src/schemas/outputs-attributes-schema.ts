import { attributeTypes } from '@/config/data'
import { z } from 'zod'

export const outputsAttributesSchema = z.object({
  outputsAttributes: z
    .array(
      z.object({
        transformationId: z.coerce.number(),
        attributes: z.array(
          z.object({
            _id: z.coerce.number(),
            name: z.string().nonempty('This field is required.'),
            type: z.enum(attributeTypes),
          }),
        ),
      }),
    )
    .min(1, 'You should set at least one output attribute.'),
})

export type OutputsAttributesData = z.infer<typeof outputsAttributesSchema>
