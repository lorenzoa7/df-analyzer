import { useTransformation } from './use-transformation'

export const useInput = () => {
  const { getTransformationById } = useTransformation()

  const getInputById = (transformationId: number, inputId: number) => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      return transformation.inputs.find((input) => input._id === inputId)
    }
  }

  const getInputAttributeById = (
    transformationId: number,
    inputId: number,
    attributeId: number,
  ) => {
    const input = getInputById(transformationId, inputId)
    if (input) {
      return input.attributes.find((attribute) => attribute._id === attributeId)
    }
  }

  return { getInputById, getInputAttributeById }
}
