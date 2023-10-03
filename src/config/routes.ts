import { SiteSteps } from './site'

export const siteRoutes = {
  code: '/code',
  dataflowTag: '/dataflow-tag',
  transformations: '/transformations',
  output: '/output',
  outputAttributes: '/output-attributes',
  inputs: '/inputs',
  inputsAttributes: '/inputs-attributes',
  tasks: '/tasks',
  tasksStamps: '/tasks-stamps',
  export: '/export',
} as const satisfies Record<SiteSteps, string>

export type SiteRoutesConfig = typeof siteRoutes
export type SiteRoutes = SiteRoutesConfig[SiteSteps]
