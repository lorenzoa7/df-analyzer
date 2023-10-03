import { SiteRoutes, siteRoutes } from '@/config/routes'

export const getNextRoute = (currentRoute: SiteRoutes) => {
  const routes = Object.values(siteRoutes)
  const currentIndex = routes.indexOf(currentRoute)
  const nextIndex = currentIndex + 1

  if (nextIndex > 0 && nextIndex < routes.length) return routes[nextIndex]
  return currentRoute
}
