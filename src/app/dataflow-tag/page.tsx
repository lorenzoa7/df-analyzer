import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TagForm from './components/tag-form'

export default function DataflowTag() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataflow Tag</CardTitle>
        <CardDescription>Type the tag of your dataflow.</CardDescription>
      </CardHeader>
      <CardContent>
        <TagForm />
      </CardContent>
    </Card>
  )
}
