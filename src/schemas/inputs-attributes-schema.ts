import { attributeTypes } from '@/config/data'
import { z } from 'zod'

export const inputsAttributesSchema = z.object({
  inputsAttributes: z
    .array(
      z.object({
        transformationId: z.coerce.number(),
        inputId: z.coerce.number(),
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

export type InputsAttributesData = z.infer<typeof inputsAttributesSchema>
