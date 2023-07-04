'use client'

import { TransformationDialog } from '@/components'
import { findHighestId } from '@/functions'
import useGeneral from '@/hooks/useGeneral'
import useTransformation from '@/hooks/useTransformation'
import { MouseEvent, Transformation } from '@/utils/types'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import * as C from './styles'

export default function Transformations() {
  const { setOpenTransformationDialog, setSelectedTransformation } =
    useTransformation()
  const { appData, setAppData } = useGeneral()

  const addTransformation = () => {
    const transformationsList = appData.transformations
    const newTransformation: Transformation = {
      id: findHighestId(transformationsList) + 1,
      name: 'New Transformation',
      output: {
        name: '',
        attributes: [],
        reference: null,
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

    const updatedInputs = updatedTransformations.flatMap((transformation) => {
      const updatedInput = transformation.inputs.map((input) => {
        if (input.transformationOutputReferenceId === transformationId) {
          return {
            ...input,
            transformationOutputReferenceId: null,
          }
        }
        return input
      })

      return {
        ...transformation,
        inputs: updatedInput,
      }
    })

    setAppData({
      ...appData,
      transformations: updatedInputs,
    })
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
        <C.EmptyLabel>Create new transformations</C.EmptyLabel>
      ) : (
        appData.transformations?.map((transformation) => (
          <C.Transformation
            key={transformation.id}
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
