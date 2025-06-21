import { ApplicationException } from '../../../core/app/exception/application-exception'
import { ProductExceptionCode } from './codes/product-exception-codes'

export class InvalidStockSubtractionException extends ApplicationException {
  constructor() {
    super(
      ProductExceptionCode.INVALID_STOCK_SUBSTRACTION,
      'Insufficient stock to subtract'
    )
  }
}
