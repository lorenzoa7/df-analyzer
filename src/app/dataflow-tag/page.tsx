import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TagForm from './components/tag-form'

export default function DataflowTag() {
  return (
    <StepCard
      title={cardConfig.dataflowTag.title}
      description={cardConfig.dataflowTag.description}
    >
      <TagForm />
    </StepCard>
  )
}
