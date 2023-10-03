import { SiteRoutes, siteRoutes } from '@/config/routes'
import { SiteSteps, siteSteps } from '@/config/site'

export const getStepByRoute = (route: SiteRoutes) => {
  const step = Object.keys(siteRoutes).find(
    (step) => siteRoutes[step as SiteSteps] === route,
  )
  return (step || siteSteps[0]) as SiteSteps
}
