export const isObjectId = (value: string): boolean => {
  console.log(`Checking if value is a valid ObjectId: ${value}`)
  console.log(value.length)
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)
}
