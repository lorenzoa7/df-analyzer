import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import InputsAttributesForm from './components/inputs-attributes-form'

export default function InputDatasetAttributes() {
  return (
    <StepCard
      title={cardConfig.inputDatasetAttributes.title}
      description={cardConfig.inputDatasetAttributes.description}
    >
      <InputsAttributesForm />
    </StepCard>
  )
}
