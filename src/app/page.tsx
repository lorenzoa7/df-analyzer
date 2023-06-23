import {
  CodeSection,
  TransformationDialog,
  Transformations,
} from '@/components'
import * as C from './styles'

export default function Home() {
  return (
    <C.PageContainer>
      <C.PageContent>
        <TransformationDialog />

        <C.Title>Df-Analyzer</C.Title>
        <C.MainContainer>
          <C.Header>
            <C.TitleLabel>DataFlow Tag</C.TitleLabel>
            <C.DataflowTagInput />
          </C.Header>

          <C.Main>
            <CodeSection />

            <C.VerticalSeparator />

            <C.Section>
              <C.TitleLabel>Transformations</C.TitleLabel>
              <Transformations />
            </C.Section>
          </C.Main>

          <C.Footer>
            <C.LoadButton>LOAD</C.LoadButton>
          </C.Footer>
        </C.MainContainer>
      </C.PageContent>
    </C.PageContainer>
  )
}
