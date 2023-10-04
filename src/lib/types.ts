export type AttributeType = 'TEXT' | 'NUMERIC' | 'FILE' | 'RDFILE'

export type Attribute = {
  _id: number
  name: string
  type: AttributeType
}

export type Output = {
  name: string
  attributes: Attribute[]
}

export type Input = {
  _id: number
  name: string
  attributes: Attribute[]
  transformationOutputReferenceId: number | null
}

export type Transformation = {
  _id: number
  name: string
  output: Output
  inputs: Input[]
}

export type Task = {
  _id: number
  name: string
  transformationId: number
  inputId: number
  inputElement: string[] | null
  outputElement: string[]
  hasBeginStamp: boolean
  hasEndStamp: boolean
}

export type CodeStamp = {
  taskId: number
  transformationId: number
  stamp: 'begin' | 'end'
}

export type DataFlow = {
  dataflow_tag: string
  code: string
  transformations: Transformation[]
  tasks: Task[]
  codeLines: (string | CodeStamp)[]
}
