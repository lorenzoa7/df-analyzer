import { SiteRoutes } from '@/config/routes'
import { SiteSteps } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { getNextRoute } from '@/functions/get-next-route'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { getStepByRoute } from '@/functions/get-step-by-route'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

export const useConstrolNavigation = () => {
  const router = useRouter()
  const currentRoute = usePathname() as SiteRoutes
  const goToNextStep = () => {
    const nextRoute = getNextRoute(currentRoute)
    const nextStep = getStepByRoute(nextRoute)
    if (nextStep) {
      Cookies.set(cookiesNames.actualStep, nextStep)
      router.replace(nextRoute)
    }
  }

  const goToPreviousStep = () => {
    const previousRoute = getPreviousRoute(currentRoute)
    const previousStep = getStepByRoute(previousRoute)
    if (previousStep) {
      Cookies.set(cookiesNames.actualStep, previousStep)
      router.replace(previousRoute)
    }
  }

  const goToStep = (step: SiteSteps) => {
    Cookies.set(cookiesNames.actualStep, step)
    router.replace(step)
  }

  return { goToNextStep, goToPreviousStep, goToStep }
}
