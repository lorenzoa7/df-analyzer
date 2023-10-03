import { SiteRoutes } from '@/config/routes'
import { getNextRoute } from '@/functions/get-next-route'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

type Props = {
  isDisabled?: boolean
}

export default function StepButtonsNext({ isDisabled = false }: Props) {
  const currentRoute = usePathname() as SiteRoutes
  const hasNextRoute = getNextRoute(currentRoute) !== currentRoute
  if (hasNextRoute) {
    return (
      <Button type="submit" disabled={isDisabled}>
        <span>Next</span>
        <ArrowRight className="ml-2 w-4" />
      </Button>
    )
  }

  return null
}
