import { MockProductRepository } from '../mocks/repositories/mock-product.repository'
import { ModifyStockService } from '../../src/product/app/services/modify-stock/modify-stock.service'
import { mockProductId1, mockProducts } from '../data/product-mock.data'
import { ProductExceptionCode } from '../../src/product/app/exceptions/codes/product-exception-codes'

test('Modify Not Decimal Stock with Decimal Stock', () => {
  const productRepo = new MockProductRepository(mockProducts)

  new ModifyStockService(productRepo)
    .execute({
      id: mockProductId1,
      operation: 'add',
      quantity: 2.5,
    })
    .then((res) => {
      const err: any = res.getException()
      expect(err.code).toBe(ProductExceptionCode.DECIMAL_STOCK)
    })
})
