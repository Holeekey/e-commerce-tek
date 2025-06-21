export const isObjectId = (value: string): boolean => {
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)
}
