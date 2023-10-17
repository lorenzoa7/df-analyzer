import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import InputsForm from './components/inputs-form'

export default function Inputs() {
  return (
    <StepCard
      title={cardConfig.inputs.title}
      description={cardConfig.inputs.description}
    >
      <InputsForm />
    </StepCard>
  )
}
