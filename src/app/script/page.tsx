import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import CodeForm from './components/code-form'

export default function Script() {
  return (
    <StepCard
      title={cardConfig.script.title}
      description={cardConfig.script.description}
    >
      <CodeForm />
    </StepCard>
  )
}
