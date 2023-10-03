import { SiteRoutes } from './routes'

export type MenuItem = {
  title: string
  route: SiteRoutes
}

export const menuConfig = [
  {
    title: 'Code',
    route: '/code',
  },
  {
    title: 'Dataflow Tag',
    route: '/dataflow-tag',
  },
  {
    title: 'Transformations',
    route: '/transformations',
  },
  {
    title: 'Outputs',
    route: '/outputs',
  },
  {
    title: 'Output Attributes',
    route: '/output-attributes',
  },
  {
    title: 'Inputs',
    route: '/inputs',
  },
  {
    title: 'Inputs Attributes',
    route: '/inputs-attributes',
  },
  {
    title: 'Tasks',
    route: '/tasks',
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
