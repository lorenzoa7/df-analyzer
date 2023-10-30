import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import OutputsAttributesForm from './components/outputs-attributes-form'

export default function OutputDatasetAttributes() {
  return (
    <StepCard
      title={cardConfig.outputDatasetAttributes.title}
      description={cardConfig.outputDatasetAttributes.description}
    >
      <OutputsAttributesForm />
    </StepCard>
  )
}
