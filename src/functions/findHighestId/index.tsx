import type { Attribute, Input, Task, Transformation } from '@/utils/types'

const findHighestId = (
  array: Array<Transformation | Input | Attribute | Task>,
) => {
  let highestId = 0

  array.forEach((item) => {
    if (item.id > highestId) highestId = item.id
  })

  return highestId
}

export default findHighestId
