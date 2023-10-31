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
  scriptInstrumentationPt1: '/script-instrumentation-pt1',
  scriptInstrumentationPt2: '/script-instrumentation-pt2',
  export: '/export',
} as const satisfies Record<SiteSteps, string>

export type SiteRoutesConfig = typeof siteRoutes
export type SiteRoutes = SiteRoutesConfig[SiteSteps]
