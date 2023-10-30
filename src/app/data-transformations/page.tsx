import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import TransformationsForm from './components/transformations-form'

export default function DataTransformations() {
  return (
    <StepCard
      title={cardConfig.dataTransformations.title}
      description={cardConfig.dataTransformations.description}
    >
      <TransformationsForm />
    </StepCard>
  )
}
