import { useTransformation } from './use-transformation'

export const useInput = () => {
  const { getTransformationById } = useTransformation()

  const getInputById = (transformationId: number, inputId: number) => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      return transformation.inputs.find((input) => input._id === inputId)
    }
  }

  return { getInputById }
}
