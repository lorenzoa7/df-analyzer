import { AttributeType } from '@/lib/types'

export const attributeTypes = [
  'FILE',
  'NUMERIC',
  'RDFILE',
  'TEXT',
] as const satisfies readonly AttributeType[]
