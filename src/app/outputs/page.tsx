import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OutputsForm from './components/outputs-form'

export default function Outputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outputs</CardTitle>
        <CardDescription>
          Define the names of the transformation outputs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OutputsForm />
      </CardContent>
    </Card>
  )
}
