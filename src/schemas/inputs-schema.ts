import { z } from 'zod'

export const inputsSchema = z.object({
  inputsList: z
    .array(
      z.object({
        transformationId: z.coerce.number(),
        inputs: z.array(
          z.object({
            _id: z.coerce.number(),
            name: z.string().nonempty('This field is required.'),
            transformationOutputReferenceId: z.coerce.number().or(z.null()),
          }),
        ),
      }),
    )
    .min(1, 'You should set at least one output attribute.'),
})

export type InputsData = z.infer<typeof inputsSchema>
