import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TasksStampsForm from './components/tasks-stamps-form'

export default function TasksStamps() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Stamps</CardTitle>
        <CardDescription>
          Define when a task begins and when it ends in the code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TasksStampsForm />
      </CardContent>
    </Card>
  )
}
