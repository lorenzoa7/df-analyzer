import { Transformation } from '@/lib/types'

export const defaultTransformation = {
  output: {
    name: '',
    attributes: [],
  },
  inputs: [],
} satisfies Omit<Transformation, 'id' | 'name'>
