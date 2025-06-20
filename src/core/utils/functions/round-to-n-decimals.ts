export const roundToNDecimals = (value: number, n: number): number => {
  if (n < 0) {
    throw new Error('Number of decimals must be a non-negative integer.')
  }

  const factor = Math.pow(10, n)
  return Math.round(value * factor) / factor
}
