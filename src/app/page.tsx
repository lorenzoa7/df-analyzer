import { CodeSection, Transformations } from '@/components'
import HeaderSection from '@/components/HeaderSection'
import * as C from './styles'

export default function Home() {
  return (
    <C.PageContainer>
      <C.PageContent>
        <C.Title>Df-Analyzer</C.Title>
        <C.MainContainer>
          <C.Header>
            <HeaderSection />
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
