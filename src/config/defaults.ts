import { DataFlow, Output, Transformation } from '@/lib/types'

export const defaultDataflowData = {
  dataflow_tag: '',
  code: '',
  transformations: [],
  tasks: [],
  codeLines: [],
} satisfies DataFlow

export const defaultTransformation = {
  output: {
    name: '',
    attributes: [],
  },
  inputs: [],
} satisfies Omit<Transformation, '_id' | 'name'>

export const defaultOutput = {
  attributes: [],
} satisfies Omit<Output, 'name'>
