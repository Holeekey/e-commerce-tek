import { ApplicationException } from '../../../core/app/exception/application-exception'
import { ProductExceptionCode } from './codes/product-exception-codes'

export class DecimalStockException extends ApplicationException {
  constructor() {
    super(
      ProductExceptionCode.DECIMAL_STOCK,
      'Decimal stock is not allowed for this product'
    )
  }
}
