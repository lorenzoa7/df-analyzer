import { SiteRoutes, siteRoutes } from '@/config/routes'

export const isActiveRoute = (currentRoute: SiteRoutes, route: SiteRoutes) => {
  const routes = Object.values(siteRoutes)
  const currentIndex = routes.indexOf(currentRoute)
  const routeIndex = routes.indexOf(route)

  return currentIndex !== -1 && routeIndex !== -1 && routeIndex <= currentIndex
}
