import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import OutputsForm from './components/outputs-form'

export default function Outputs() {
  return (
    <StepCard
      title={cardConfig.outputs.title}
      description={cardConfig.outputs.description}
    >
      <OutputsForm />
    </StepCard>
  )
}
