import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TasksElementsForm from './components/tasks-elements-form'

export default function Tasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Elements</CardTitle>
        <CardDescription>
          Associate the variables of the code to the attributes of each task.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TasksElementsForm />
      </CardContent>
    </Card>
  )
}
