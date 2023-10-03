import { SiteRoutes } from '@/config/routes'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function StepButtonsBack() {
  const { goToPreviousStep } = useConstrolNavigation()
  const currentRoute = usePathname() as SiteRoutes
  const hasPreviousRoute = getPreviousRoute(currentRoute) !== currentRoute
  if (hasPreviousRoute) {
    return (
      <Button variant="outline" type="button" onClick={goToPreviousStep}>
        <ArrowLeft className="mr-2 w-4" />
        <span>Back</span>
      </Button>
    )
  }

  return null
}
