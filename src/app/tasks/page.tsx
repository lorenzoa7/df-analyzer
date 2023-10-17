import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TasksForm from './components/tasks-form'

export default function Tasks() {
  return (
    <StepCard
      title={cardConfig.tasks.title}
      description={cardConfig.tasks.description}
    >
      <TasksForm />
    </StepCard>
  )
}
