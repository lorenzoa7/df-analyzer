import { SiteRoutes, siteRoutes } from '@/config/routes'
import { SiteSteps } from '@/config/site'

export const getStepByRoute = (route: SiteRoutes) => {
  const step = Object.keys(siteRoutes).find(
    (step) => siteRoutes[step as SiteSteps] === route,
  ) as SiteSteps | undefined

  return step
}
