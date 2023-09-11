// General

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>
export type FormEvent = React.FormEvent<EventTarget>
export type MouseEvent = React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

// DataFlow Data

export type AttributeType = 'TEXT' | 'NUMERIC' | 'FILE' | 'RDFILE'

export type Attribute = {
  id: number
  name: string
  type: AttributeType
}

export type Output = {
  name: string
  attributes: Attribute[]
}

export type Input = {
  id: number
  name: string
  attributes: Attribute[]
  transformationOutputReferenceId: number | null
}

export type Transformation = {
  id: number
  name: string
  output: Output
  inputs: Input[]
}

export type DataFlow = {
  dataflow_tag: string
  code: string
  transformations: Transformation[]
}
