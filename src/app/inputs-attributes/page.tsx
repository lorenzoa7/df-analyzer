import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import InputsAttributesForm from './components/inputs-attributes-form'

export default function InputsAttributes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inputs Attributes</CardTitle>
        <CardDescription>Define the attributes of the inputs.</CardDescription>
      </CardHeader>
      <CardContent>
        <InputsAttributesForm />
      </CardContent>
    </Card>
  )
}
