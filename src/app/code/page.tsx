import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import CodeForm from './components/code-form'

export default function Code() {
  return (
    <StepCard
      title={cardConfig.code.title}
      description={cardConfig.code.description}
    >
      <CodeForm />
    </StepCard>
  )
}
