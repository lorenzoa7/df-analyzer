export const siteConfig = {
  title: 'Interface Generator | DF-Analyazer',
  description: 'Generate a DF-Analyzer script very easily with this app.',
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
