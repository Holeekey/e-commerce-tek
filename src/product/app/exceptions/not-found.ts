import { ApplicationException } from '../../../core/app/exception/application-exception'
import { ProductExceptionCode } from './codes/product-exception-codes'

export class ProductNotFoundException extends ApplicationException {
  constructor() {
    super(ProductExceptionCode.NOT_FOUND, 'Product not found')
  }
}
