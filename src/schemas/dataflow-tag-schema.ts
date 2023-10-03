import { z } from 'zod'

export const dataflowTagSchema = z.object({
  dataflowTag: z.string().nonempty('This field is required.'),
})

export type DataflowTagData = z.infer<typeof dataflowTagSchema>
