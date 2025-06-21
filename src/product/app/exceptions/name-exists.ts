import { ApplicationException } from '../../../core/app/exception/application-exception'
import { ProductExceptionCode } from './codes/product-exception-codes'

export class ProductNameExistsException extends ApplicationException {
  constructor() {
    super(ProductExceptionCode.NAME_EXISTS, 'Product name already exists')
  }
}
