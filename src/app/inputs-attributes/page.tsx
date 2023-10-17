import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import InputsAttributesForm from './components/inputs-attributes-form'

export default function InputsAttributes() {
  return (
    <StepCard
      title={cardConfig.inputsAttributes.title}
      description={cardConfig.inputsAttributes.description}
    >
      <InputsAttributesForm />
    </StepCard>
  )
}
