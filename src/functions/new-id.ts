import { Attribute, Input, Task, Transformation } from '@/lib/types'
import { findHighestId } from './find-highest-id'

type Props = {
  idList: Array<Transformation | Input | Attribute | Task>
  modifier?: number
}

export const newId = ({ idList, modifier = 0 }: Props) => {
  return findHighestId(idList) + 1 + modifier
}
