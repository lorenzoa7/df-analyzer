'use client'

import useData from '@/hooks/useData'
import { BsFillPencilFill } from 'react-icons/bs'
import * as C from './styles'

export default function Transformations() {
  const { setOpenTransformationDialog } = useData()

  return (
    <C.TransformationsList>
      <C.TransformationPlaceholder>
        <BsFillPencilFill size={20} />
        Transformation 1
      </C.TransformationPlaceholder>
      <C.TransformationPlaceholder>
        <BsFillPencilFill size={20} />
        Transformation 2
      </C.TransformationPlaceholder>
      <C.TransformationPlaceholder>
        <BsFillPencilFill size={20} />
        Transformation 3
      </C.TransformationPlaceholder>

      <C.AddTransformationButton
        onClick={() => setOpenTransformationDialog(true)}
      >
        +
      </C.AddTransformationButton>
    </C.TransformationsList>
  )
}
