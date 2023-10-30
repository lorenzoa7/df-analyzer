import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import InputsForm from './components/inputs-form'

export default function InputDatasets() {
  return (
    <StepCard
      title={cardConfig.inputDatasets.title}
      description={cardConfig.inputDatasets.description}
    >
      <InputsForm />
    </StepCard>
  )
}
