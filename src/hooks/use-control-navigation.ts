import { SiteRoutes } from '@/config/routes'
import { localStorageNames } from '@/config/storage'
import { getNextRoute } from '@/functions/get-next-route'
import { getStepByRoute } from '@/functions/get-step-by-route'
import { setLocalStorage } from '@/functions/set-local-storage'
import { useRouter } from 'next/navigation'

export const useConstrolNavigation = () => {
  const router = useRouter()
  const goToNextStep = (currentRoute: SiteRoutes) => {
    const nextRoute = getNextRoute(currentRoute)
    setLocalStorage(localStorageNames.actualStep, getStepByRoute(nextRoute))
    router.replace(nextRoute)
  }

  return { goToNextStep }
}
