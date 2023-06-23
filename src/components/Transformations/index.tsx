'use client'

import useData from '@/hooks/useData'
import { BsFillPencilFill } from 'react-icons/bs'
import * as C from './styles'

export default function Transformations() {
  const { setOpenTransformationDialog, appData, setAppData } = useData()

  return (
    <C.TransformationsContainer>
      <C.AddTransformationButton
        onClick={() => setOpenTransformationDialog(true)}
      >
        +
      </C.AddTransformationButton>

      {appData.transformations.length === 0 ? (
        <C.Label>Create new transformations</C.Label>
      ) : (
        appData.transformations?.map((transformation, index) => (
          <C.TransformationPlaceholder key={index}>
            <BsFillPencilFill size={20} />
            {transformation.name}
          </C.TransformationPlaceholder>
        ))
      )}
    </C.TransformationsContainer>
  )
}
