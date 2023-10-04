import { SiteRoutes } from '@/config/routes'
import { getNextRoute } from '@/functions/get-next-route'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

type Props = {
  isNextDisabled?: boolean
  backFunction?: () => void
}

export default function StepButtons({
  isNextDisabled = false,
  backFunction = () => null,
}: Props) {
  const { goToPreviousStep } = useConstrolNavigation()
  const currentRoute = usePathname() as SiteRoutes
  const hasPreviousRoute = getPreviousRoute(currentRoute) !== currentRoute
  const hasNextRoute = getNextRoute(currentRoute) !== currentRoute

  const handleClickBackButton = () => {
    backFunction()
    goToPreviousStep()
  }

  return (
    <div className="flex w-full items-center justify-between">
      {hasPreviousRoute && (
        <Button variant="outline" type="button" onClick={handleClickBackButton}>
          <ArrowLeft className="mr-2 w-4" />
          <span>Back</span>
        </Button>
      )}

      {hasNextRoute && (
        <Button type="submit" disabled={isNextDisabled}>
          <span>Next</span>
          <ArrowRight className="ml-2 w-4" />
        </Button>
      )}
    </div>
  )
}
