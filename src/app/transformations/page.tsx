import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TransformationsForm from './components/transformations-form'

export default function Transformations() {
  return (
    <StepCard
      title={cardConfig.transformations.title}
      description={cardConfig.transformations.description}
    >
      <TransformationsForm />
    </StepCard>
  )
}
