import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TasksStampsForm from './components/tasks-stamps-form'

export default function TasksStamps() {
  return (
    <StepCard
      title={cardConfig.scriptInstrumentationPt2.title}
      description={cardConfig.scriptInstrumentationPt2.description}
    >
      <TasksStampsForm />
    </StepCard>
  )
}
