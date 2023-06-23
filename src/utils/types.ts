// General

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>
export type FormEvent = React.FormEvent<EventTarget>
export type MouseEvent = React.MouseEvent<HTMLButtonElement>

// DataFlow Data

export type DataFlow = {
  dataflow_tag: string
  code: string
  transformations: Transformation[]
}

export type Transformation = {
  name: string
  output: Output
  inputs: Input[]
}

export type Output = {
  name: string
  attributes: Attribute[]
}

export type Input = {
  name: string
  attributes: Attribute[]
}

export type Attribute = {
  name: string
  type: string
}