import { Response } from 'express'
import { ApplicationException } from '../../app/exception/application-exception'

export const expressExceptionHandler = (res: Response) => {
  return (exception: Error) => {
    let statusCode: number = 500

    if (exception instanceof ApplicationException) {
      if (exception.code.endsWith('NF')) {
        statusCode = 404
      } else if (exception.code.endsWith('UN')) {
        statusCode = 401
      } else if (exception.code === 'UNEXPECTED') {
        statusCode = 500
      } else {
        statusCode = 400
      }
      res.status(statusCode).send({
        code: exception.code,
        message: exception.message,
      })
      return exception
    }

    res.status(statusCode).send(exception)
    return exception
  }
}
