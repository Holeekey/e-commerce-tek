export const paginateArray = <T>(
  array: T[],
  page: number,
  limit: number
): T[] => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  return array.slice(startIndex, endIndex)
}
