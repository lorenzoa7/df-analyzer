import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Tasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          Define how many tasks it will have and their respective names.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
