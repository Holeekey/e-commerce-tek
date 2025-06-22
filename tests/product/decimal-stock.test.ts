import { CreateProductService } from '../../src/product/app/services/create/create-product.service'
import { ObjectIdGenerator } from '../../src/core/infra/object-id/object-id-generator'
import { MockProductRepository } from '../mocks/repositories/mock-product.repository'
import { ProductExceptionCode } from '../../src/product/app/exceptions/codes/product-exception-codes'

test('Decimal Stock in Not Decimal Stock Product', () => {
  const productRepo = new MockProductRepository()

  new CreateProductService(new ObjectIdGenerator(), productRepo)
    .execute({
      name: 'Test Product',
      stock: 10.5, // Decimal stock
      description: 'This is a test product',
      canStockBeDecimal: false, // Not allowed to have decimal stock
      price: 100,
    })
    .then((res) => {
      const err: any = res.getException()
      expect(err.code).toBe(ProductExceptionCode.DECIMAL_STOCK)
    })
})
