import StepCard from '@/components/step-card'
import { cardConfig } from '@/config/data'
import ExportSection from './components/export-section'

export default function Export() {
  return (
    <StepCard
      title={cardConfig.export.title}
      description={cardConfig.export.description}
    >
      <ExportSection />
    </StepCard>
  )
}
