import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import OutputsAttributesForm from './components/outputs-attributes-form'

export default function Outputs() {
  return (
    <StepCard
      title={cardConfig.outputsAttributes.title}
      description={cardConfig.outputsAttributes.description}
    >
      <OutputsAttributesForm />
    </StepCard>
  )
}
