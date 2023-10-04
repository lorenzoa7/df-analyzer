type Props<T extends { _id: number }> = T[]

export const extractIds = <T extends { _id: number }>(array: Props<T>) => {
  return array.map((item) => item._id)
}
