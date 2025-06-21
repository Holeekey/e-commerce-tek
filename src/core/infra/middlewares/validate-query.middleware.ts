import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

export const validateQuery = <T extends object>(type: new () => T) => {
  return async (req, res, next) => {
    const instance = plainToInstance(type, req.query)
    const errors = await validate(instance)

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      })
    }

    req.queryParams = instance

    next()
  }
}
