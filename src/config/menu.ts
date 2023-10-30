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
    title: 'Tasks Elements',
    route: '/tasks-elements',
  },
  {
    title: 'Tasks Stamps',
    route: '/tasks-stamps',
  },
  {
    title: 'Export',
    route: '/export',
  },
] as const satisfies Readonly<MenuItem[]>
