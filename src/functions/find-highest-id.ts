import type { Attribute, Input, Task, Transformation } from '@/lib/types'

export const findHighestId = (
  array: Array<Transformation | Input | Attribute | Task>,
) => {
  let highestId = 0

  array.forEach((item) => {
    if (item._id > highestId) highestId = item._id
  })

  return highestId
}
