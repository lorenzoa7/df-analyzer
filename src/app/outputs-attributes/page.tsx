import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OutputsAttributesForm from './components/outputs-attributes-form'

export default function Outputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outputs Attributes</CardTitle>
        <CardDescription>Define the attributes of the outputs.</CardDescription>
      </CardHeader>
      <CardContent>
        <OutputsAttributesForm />
      </CardContent>
    </Card>
  )
}
