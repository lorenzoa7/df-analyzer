import CodePreview from '@/components/CodePreview'
import ExportSection from '@/components/ExportSection'
import * as C from '../styles'

export default function CodePage() {
  return (
    <C.MainContainer>
      <C.Header className="h-auto">
        <C.TitleLabel>Code Preview</C.TitleLabel>
      </C.Header>

      <C.Main className="my-3">
        <CodePreview />
      </C.Main>

      <C.Footer>
        <ExportSection />
      </C.Footer>
    </C.MainContainer>
  )
}
