import { AttributeType, CodeLineTypes, Stamp } from '@/lib/types'
import { SiteSteps } from './site'

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

export const cardConfig: Record<
  SiteSteps,
  Record<'title' | 'description', string>
> = {
  code: {
    title: 'Code',
    description: 'Paste here your raw code so we can begin!',
  },
  dataflowTag: {
    title: 'Dataflow Tag',
    description: 'Define the tag of your dataflow.',
  },
  transformations: {
    title: 'Transformations',
    description:
      'Define how many transformations it will have and their respective names',
  },
  outputs: {
    title: 'Outputs',
    description: 'Define the names of the transformation outputs.',
  },
  outputsAttributes: {
    title: 'Outputs Attributes',
    description: 'Define the attributes of the outputs.',
  },
  inputs: {
    title: 'Inputs',
    description:
      'Define how many inputs each transformation will have and their respective names.',
  },
  inputsAttributes: {
    title: 'Inputs Attributes',
    description: 'Define the attributes of the inputs.',
  },
  tasks: {
    title: 'Tasks',
    description:
      'Define how many tasks it will have and their respective names.',
  },
  tasksElements: {
    title: 'Tasks Elements',
    description:
      'Associate the variables of the code to the attributes of each task.',
  },
  tasksStamps: {
    title: 'Tasks Stamps',
    description: 'Define when a task begins and when it ends in the code.',
  },
  export: {
    title: 'Export',
    description:
      'Congratulations! You have successfully generated a Df-Analyzer script! You can copy or download the python code below.',
  },
}
