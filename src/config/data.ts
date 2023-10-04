import { AttributeType } from '@/lib/types'

export const attributeTypes = [
  'TEXT',
  'NUMERIC',
  'FILE',
  'RDFILE',
] as const satisfies readonly AttributeType[]
