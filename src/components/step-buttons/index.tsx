import StepButtonsBack from './back'
import StepButtonsNext from './next'
import StepButtonsRoot from './root'

type Props = {
  isNextDisabled?: boolean
}

export default function StepButtons({ isNextDisabled = false }: Props) {
  return (
    <StepButtonsRoot>
      <StepButtonsBack />
      <StepButtonsNext isDisabled={isNextDisabled} />
    </StepButtonsRoot>
  )
}
