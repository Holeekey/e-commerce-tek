export const validateParam = (
  paramName: string,
  validationFunc: (value: string) => boolean
) => {
  return async (req, res, next) => {
    const valid = validationFunc(req.params[paramName])
    if (!valid) {
      return res
        .status(400)
        .json({ message: `Param ${paramName} invalid format` })
    }
    next()
  }
}
