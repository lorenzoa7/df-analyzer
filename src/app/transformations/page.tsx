import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TransformationsForm from './components/transformations-form'

export default function Transformations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transformation</CardTitle>
        <CardDescription>
          Define how many transformations it will have and their respective
          names.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransformationsForm />
      </CardContent>
    </Card>
  )
}
