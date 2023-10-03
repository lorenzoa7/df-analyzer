import { z } from 'zod'

export const codeSchema = z.object({
  code: z.string().nonempty('This field is required.'),
})

export type CodeData = z.infer<typeof codeSchema>
