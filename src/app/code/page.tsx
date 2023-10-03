import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CodeForm from './components/code-form'

export default function Code() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code</CardTitle>
        <CardDescription>
          Paste here your raw code so we can begin!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeForm />
      </CardContent>
    </Card>
  )
}
