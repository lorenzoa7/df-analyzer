import { SiteRoutes } from '@/config/routes'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function StepButtonsBack() {
  const currentRoute = usePathname() as SiteRoutes
  const { goToPreviousStep } = useConstrolNavigation()
  return (
    <Button
      variant="outline"
      type="submit"
      onClick={() => goToPreviousStep(currentRoute)}
    >
      <ArrowLeft className="mr-2 w-4" />
      <span>Back</span>
    </Button>
  )
}
