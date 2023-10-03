import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function StepButtonsNext() {
  return (
    <Button type="submit">
      <span>Next</span>
      <ArrowRight className="ml-2 w-4" />
    </Button>
  )
}
