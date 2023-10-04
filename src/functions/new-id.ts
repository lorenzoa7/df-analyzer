import { findHighestId } from './find-highest-id'

type Props = {
  idList: number[]
  modifier?: number
}

export const newId = ({ idList, modifier = 0 }: Props) => {
  return findHighestId(idList) + 1 + modifier
}
