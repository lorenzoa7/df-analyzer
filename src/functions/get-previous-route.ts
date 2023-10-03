import { SiteRoutes, siteRoutes } from '@/config/routes'

export const getPreviousRoute = (currentRoute: SiteRoutes) => {
  const routes = Object.values(siteRoutes)
  const currentIndex = routes.indexOf(currentRoute)
  const previousIndex = currentIndex - 1

  if (previousIndex >= 0) return routes[previousIndex]
  return currentRoute
}
