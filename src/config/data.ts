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
  script: {
    title: 'Script',
    description: 'Paste here your Script so we can start the instrumentation!',
  },
  dataflowTag: {
    title: 'Dataflow Tag',
    description:
      'Assign a tag to the dataflow for which you wish to capture provenance data.',
  },
  dataTransformations: {
    title: 'Data Transformations',
    description: 'Specify the name of data transformations within your script.',
  },
  outputDataset: {
    title: 'Output Dataset',
    description:
      'Specify the names of the output datasets for the transformations.',
  },
  outputDatasetAttributes: {
    title: 'Output Dataset Attributes',
    description: 'Specify the attributes for each output dataset.',
  },
  inputDatasets: {
    title: 'Input Datasets',
    description:
      'Specify the input datasets for each transformation and their corresponding names.',
  },
  inputDatasetAttributes: {
    title: 'Input Dataset Attributes',
    description: 'Specify the attributes of the following input datasets.',
  },
  tasks: {
    title: 'Tasks',
    description:
      'Specify the tasks that will be executed in the script and their respective names.',
  },
  tasksElements: {
    title: 'Tasks Elements',
    description:
      "Link the script's variables to the attributes of each dataset consumed or produced by a task.",
  },
  tasksStamps: {
    title: 'Tasks Stamps',
    description: 'Mark in your script where each task begins and ends.',
  },
  export: {
    title: 'Export Instrumented Script',
    description:
      'Congratulations! You have successfully instrumented your script for use with Df-Analyzer. You can now copy or download the Python code provided below.',
  },
}
