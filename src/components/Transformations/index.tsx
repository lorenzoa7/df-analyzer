'use client'

import { TransformationDialog } from '@/components'
import { findHighestTransformationId } from '@/functions'
import useGeneral from '@/hooks/useGeneral'
import useTransformation from '@/hooks/useTransformation'
import { MouseEvent, Transformation } from '@/utils/types'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import * as C from './styles'

export default function Transformations() {
  const {
    setOpenTransformationDialog,
    selectedTransformation,
    setSelectedTransformation,
  } = useTransformation()
  const { appData, setAppData } = useGeneral()

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

  const deleteTransformation = (e: MouseEvent, transformationId: number) => {
    e.stopPropagation()
    const updatedTransformations = appData.transformations.filter(
      (transformation) => transformation.id !== transformationId,
    )

    setAppData({ ...appData, transformations: updatedTransformations })
  }

  const editTransformation = (transformation: Transformation) => {
    setSelectedTransformation(transformation)
    setOpenTransformationDialog(true)
  }

  return (
    <C.TransformationsContainer>
      <TransformationDialog />
      <C.AddTransformationButton onClick={addTransformation}>
        +
      </C.AddTransformationButton>

      {appData.transformations.length === 0 ? (
        <C.Label>Create new transformations</C.Label>
      ) : (
        appData.transformations?.map((transformation, index) => (
          <C.Transformation
            key={index}
            onClick={() => editTransformation(transformation)}
          >
            <BsFillPencilFill size={20} />
            <span className="w-full text-start">{transformation.name}</span>
            <C.DeleteTransformation
              onClick={(e) => deleteTransformation(e, transformation.id)}
            >
              <AiFillDelete size={'75%'} />
            </C.DeleteTransformation>
          </C.Transformation>
        ))
      )}
    </C.TransformationsContainer>
  )
}
