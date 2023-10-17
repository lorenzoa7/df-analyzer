import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TasksElementsForm from './components/tasks-elements-form'

export default function TasksElements() {
  return (
    <StepCard
      title={cardConfig.tasksElements.title}
      description={cardConfig.tasksElements.description}
    >
      <TasksElementsForm />
    </StepCard>
  )
}
