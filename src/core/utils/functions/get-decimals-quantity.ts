export const getDecimalsQuantity = (quantity: number): number => {
  if (Number.isInteger(quantity)) {
    return 0
  }

  const quantityString = quantity.toString()
  const decimalPart = quantityString.split('.')[1]

  if (!decimalPart) {
    return 0
  }

  return decimalPart.length
}
