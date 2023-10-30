export const siteConfig = {
  title: 'Script Instrumentation | DfAnalyzer',
  description: 'Generate a DfAnalyzer script very easily with this app.',
} satisfies Record<string, string>

export type SiteConfig = typeof siteConfig

export const siteSteps = [
  'script',
  'dataflowTag',
  'dataTransformations',
  'outputDataset',
  'outputDatasetAttributes',
  'inputDatasets',
  'inputDatasetAttributes',
  'tasks',
  'tasksElements',
  'tasksStamps',
  'export',
] as const satisfies readonly string[]

export type SiteSteps = (typeof siteSteps)[number]
