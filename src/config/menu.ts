import { SiteRoutes } from './routes'

export type MenuItem = {
  title: string
  route: SiteRoutes
}

export const menuConfig = [
  {
    title: 'Script',
    route: '/script',
  },
  {
    title: 'Dataflow Tag',
    route: '/dataflow-tag',
  },
  {
    title: 'Data Transformations',
    route: '/data-transformations',
  },
  {
    title: 'Output Dataset',
    route: '/output-dataset',
  },
  {
    title: 'Output Dataset Attributes',
    route: '/output-dataset-attributes',
  },
  {
    title: 'Input Datasets',
    route: '/input-datasets',
  },
  {
    title: 'Input Dataset Attributes',
    route: '/input-dataset-attributes',
  },
  {
    title: 'Tasks',
    route: '/tasks',
  },
  {
    title: 'Script Instrumentation pt.1',
    route: '/script-instrumentation-pt1',
  },
  {
    title: 'Script Instrumentation pt.2',
    route: '/script-instrumentation-pt2',
  },
  {
    title: 'Export',
    route: '/export',
  },
] as const satisfies Readonly<MenuItem[]>
