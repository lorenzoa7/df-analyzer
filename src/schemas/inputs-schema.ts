import { z } from 'zod'

export const inputsSchema = z.object({
  inputsList: z
    .array(
      z.object({
        transformationId: z.coerce.number(),
        inputs: z.array(
          z
            .object({
              _id: z.coerce.number(),
              name: z.string(),
              transformationOutputReferenceId: z.coerce.number(),
            })
            .refine(
              (values) =>
                values.transformationOutputReferenceId !== -1
                  ? values.name.length === 0
                  : values.name.length > 0,
              {
                message: 'You should provide a valid name.',
                path: ['name'],
              },
            ),
        ),
      }),
    )
    .min(1, 'You should set at least one output attribute.'),
})

export type InputsData = z.input<typeof inputsSchema>
