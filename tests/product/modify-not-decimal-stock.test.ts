import { MockProductRepository } from '../mocks/mock-product.repository'
import { ModifyStockService } from '../../src/product/app/services/modify-stock/modify-stock.service'
import { mockId1, mockProducts } from '../data/product-mock.data'

test('Modify Not Decimal Stock with Decimal Stock', () => {
  const productRepo = new MockProductRepository(mockProducts)

  new ModifyStockService(productRepo)
    .execute({
      id: mockId1,
      operation: 'add',
      quantity: 2.5,
    })
    .then((res) => {
      expect(res.isException()).toBe(true)
    })
})
