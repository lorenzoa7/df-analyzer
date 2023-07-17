import { CodeSection, Transformations } from '@/components'
import HeaderSection from '@/components/HeaderSection'
import LoadSection from '@/components/LoadSection'
import * as C from './styles'

export default function Home() {
  return (
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
        <LoadSection />
      </C.Footer>
    </C.MainContainer>
  )
}
