import { AttributeType, CodeLineTypes, Stamp } from '@/lib/types'

export const attributeTypes = [
  'TEXT',
  'NUMERIC',
  'FILE',
  'RDFILE',
] as const satisfies readonly AttributeType[]

export const stamps = ['begin', 'end'] as const satisfies readonly Stamp[]

export const codeLineTypes = [
  'code',
  'stamp',
] as const satisfies readonly CodeLineTypes[]
