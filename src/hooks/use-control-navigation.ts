import { SiteRoutes } from '@/config/routes'
import { cookiesNames } from '@/config/storage'
import { getNextRoute } from '@/functions/get-next-route'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { getStepByRoute } from '@/functions/get-step-by-route'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const useConstrolNavigation = () => {
  const router = useRouter()
  const goToNextStep = (currentRoute: SiteRoutes) => {
    const nextRoute = getNextRoute(currentRoute)
    const nextStep = getStepByRoute(nextRoute)
    if (nextStep) {
      Cookies.set(cookiesNames.actualStep, nextStep)
      router.replace(nextRoute)
    }
  }

  const goToPreviousStep = (currentRoute: SiteRoutes) => {
    const previousRoute = getPreviousRoute(currentRoute)
    const previousStep = getStepByRoute(previousRoute)
    if (previousStep) {
      Cookies.set(cookiesNames.actualStep, previousStep)
      router.replace(previousRoute)
    }
  }

  return { goToNextStep, goToPreviousStep }
}
