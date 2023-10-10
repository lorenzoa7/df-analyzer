import { useApp } from '@/providers/app-provider'

export const useTransformation = () => {
  const { dataflowData } = useApp()
  const transformationsList = dataflowData.transformations
  const getTransformationById = (id: number) => {
    return transformationsList.find(
      (transformation) => transformation._id === id,
    )
  }

  const getOutputAttributeById = (
    transformationId: number,
    attributeId: number,
  ) => {
    return getTransformationById(transformationId)?.output.attributes.find(
      (attribute) => attribute._id === attributeId,
    )
  }

  return { getTransformationById, getOutputAttributeById }
}
