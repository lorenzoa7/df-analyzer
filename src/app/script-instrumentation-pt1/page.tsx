import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TasksElementsForm from './components/tasks-elements-form'

export default function TasksElements() {
  return (
    <StepCard
      title={cardConfig.scriptInstrumentationPt1.title}
      description={cardConfig.scriptInstrumentationPt1.description}
    >
      <TasksElementsForm />
    </StepCard>
  )
}
