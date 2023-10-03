import { SiteRoutes } from '@/config/routes'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {
  currentRoute: SiteRoutes
}

export default function StepButtonsBack({ currentRoute }: Props) {
  return (
    <Link href={getPreviousRoute(currentRoute)} passHref>
      <Button variant="outline" type="submit">
        <ArrowLeft className="mr-2 w-4" />
        <span>Back</span>
      </Button>
    </Link>
  )
}
