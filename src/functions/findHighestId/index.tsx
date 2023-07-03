import { Attribute, Input, Transformation } from '@/utils/types'

const findHighestId = (array: Array<Transformation | Input | Attribute>) => {
  let highestId = 0

  array.forEach((item) => {
    if (item.id > highestId) highestId = item.id
  })

  return highestId
}

export default findHighestId
