import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import OutputsForm from './components/outputs-form'

export default function OutputDataset() {
  return (
    <StepCard
      title={cardConfig.outputDataset.title}
      description={cardConfig.outputDataset.description}
    >
      <OutputsForm />
    </StepCard>
  )
}
