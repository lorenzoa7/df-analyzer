import { Transformation } from '@/utils/types'

const findHighestTransformationId = (
  transformations: Array<Transformation>,
) => {
  let highestId = 0

  transformations.forEach((transformation) => {
    if (transformation.id > highestId) highestId = transformation.id
  })

  return highestId
}

export default findHighestTransformationId
