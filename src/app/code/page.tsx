import CodePreview from '@/components/CodePreview'
import ExportSection from '@/components/ExportSection'
import * as C from '../styles'

export default function CodePage() {
  return (
    <C.MainContainer>
      <C.Header>
        <C.TitleLabel>Code Preview</C.TitleLabel>
      </C.Header>

      <C.Main>
        <CodePreview />
      </C.Main>

      <C.Footer>
        <ExportSection />
      </C.Footer>
    </C.MainContainer>
  )
}
