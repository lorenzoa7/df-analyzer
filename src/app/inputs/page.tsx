import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import InputsForm from './components/inputs-form'

export default function Inputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inputs</CardTitle>
        <CardDescription>
          Define how many inputs each transformation will have and their
          respective names.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InputsForm />
      </CardContent>
    </Card>
  )
}
