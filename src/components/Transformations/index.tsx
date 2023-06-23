'use client'

import { findHighestTransformationId } from '@/functions'
import useData from '@/hooks/useData'
import { Transformation } from '@/utils/types'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import * as C from './styles'

export default function Transformations() {
  const { setOpenTransformationDialog, appData, setAppData } = useData()

  const addTransformation = () => {
    const transformationsList = appData.transformations
    const newTransformation: Transformation = {
      id: findHighestTransformationId(transformationsList) + 1,
      name: 'New Transformation',
      output: {
        name: '',
        attributes: [],
      },
      inputs: [],
    }

    setAppData({
      ...appData,
      transformations: transformationsList.concat(newTransformation),
    })
  }

  const deleteTransformation = (transformationId: number) => {
    const updatedTransformations = appData.transformations.filter(
      (transformation) => transformation.id !== transformationId,
    )

    setAppData({ ...appData, transformations: updatedTransformations })
  }

  return (
    <C.TransformationsContainer>
      <C.AddTransformationButton onClick={addTransformation}>
        +
      </C.AddTransformationButton>

      {appData.transformations.length === 0 ? (
        <C.Label>Create new transformations</C.Label>
      ) : (
        appData.transformations?.map((transformation, index) => (
          <C.TransformationPlaceholder key={index}>
            <BsFillPencilFill size={20} />
            <span className="w-full text-start">{transformation.name}</span>
            <C.DeleteTransformation
              onClick={() => deleteTransformation(transformation.id)}
            >
              <AiFillDelete size={'75%'} />
            </C.DeleteTransformation>
          </C.TransformationPlaceholder>
        ))
      )}
    </C.TransformationsContainer>
  )
}
