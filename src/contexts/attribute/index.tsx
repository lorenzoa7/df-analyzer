import { findHighestId } from '@/functions'
import useTransformation from '@/hooks/useTransformation'
import { Attribute, Output } from '@/utils/types'
import { createContext } from 'react'

type OutputUpdateAttributeProps = {
  id: number
  updatedFields: Partial<Attribute>
}

type InputUpdateAttributeProps = {
  transformationId: number
  inputId: number
  updatedFields: Partial<Attribute>
}

export type AttributeContextProps = {
  createOutputAttribute: (id: number) => void
  updateOutputAttribute: ({
    id,
    updatedFields,
  }: OutputUpdateAttributeProps) => void
  deleteOutputAttribute: (tranformationId: number, attributeId: number) => void
}

const AttributeContext = createContext<AttributeContextProps>(
  {} as AttributeContextProps,
)

const AttributeProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateTransformation, getTransformationById } = useTransformation()

  const createOutputAttribute = (id: number): void => {
    const transformation = getTransformationById(id)
    if (transformation) {
      const attributesList = transformation.output.attributes
      const newAttribute: Attribute = {
        id: findHighestId(attributesList) + 1,
        name: 'New Attribute',
        type: 'TEXT',
      }

      const editedOutput: Output = {
        ...transformation.output,
        attributes: attributesList.concat(newAttribute),
      }

      updateTransformation(id, { output: editedOutput })
    }
  }

  const updateOutputAttribute = ({
    id,
    updatedFields,
  }: OutputUpdateAttributeProps): void => {
    const transformation = getTransformationById(id)
    if (transformation) {
      const editedAttributes = {
        ...transformation.output.attributes,
        ...updatedFields,
      }
      const editedOutput = {
        ...transformation.output,
        attributes: editedAttributes,
      }
      updateTransformation(id, { output: editedOutput })
    }
  }

  const deleteOutputAttribute = (
    transformationId: number,
    attributeId: number,
  ): void => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      const attributesList = transformation.output.attributes
      const updatedAttributes = attributesList.filter(
        (attribute) => attribute.id !== attributeId,
      )

      const editedOutput: Output = {
        ...transformation.output,
        attributes: updatedAttributes,
      }

      updateTransformation(transformationId, { output: editedOutput })
    }
  }

  return (
    <AttributeContext.Provider
      value={{
        createOutputAttribute,
        updateOutputAttribute,
        deleteOutputAttribute,
      }}
    >
      {children}
    </AttributeContext.Provider>
  )
}

export { AttributeContext, AttributeProvider }

