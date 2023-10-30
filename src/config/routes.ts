import { SiteSteps } from './site'

export const siteRoutes = {
  script: '/script',
  dataflowTag: '/dataflow-tag',
  dataTransformations: '/data-transformations',
  outputDataset: '/output-dataset',
  outputDatasetAttributes: '/output-dataset-attributes',
  inputDatasets: '/input-datasets',
  inputDatasetAttributes: '/input-dataset-attributes',
  tasks: '/tasks',
  tasksElements: '/tasks-elements',
  tasksStamps: '/tasks-stamps',
  export: '/export',
} as const satisfies Record<SiteSteps, string>

export type SiteRoutesConfig = typeof siteRoutes
export type SiteRoutes = SiteRoutesConfig[SiteSteps]
