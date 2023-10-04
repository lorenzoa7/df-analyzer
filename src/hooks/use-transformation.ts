import { useApp } from '@/providers/app-provider'

export const useTransformation = () => {
  const { dataflowData } = useApp()
  const transformationsList = dataflowData.transformations
  const getTransformationById = (id: number) => {
    return transformationsList.find(
      (transformation) => transformation.id === id,
    )
  }

  return { getTransformationById }
}
