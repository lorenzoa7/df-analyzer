export const findHighestId = (array: number[]) => {
  let highestId = 0

  array.forEach((id) => {
    if (id > highestId) highestId = id
  })

  return highestId
}
