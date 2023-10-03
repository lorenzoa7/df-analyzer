import StepButtonsBack from './back'
import StepButtonsNext from './next'
import StepButtonsRoot from './root'

export default function StepButtons() {
  return (
    <StepButtonsRoot>
      <StepButtonsBack />
      <StepButtonsNext />
    </StepButtonsRoot>
  )
}
