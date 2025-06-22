import { CreateProductService } from '../../src/product/app/services/create/create-product.service'
import { ObjectIdGenerator } from '../../src/core/infra/object-id/object-id-generator'
import { MockProductRepository } from '../mocks/repositories/mock-product.repository'
import { mockProducts } from '../data/product-mock.data'

test('Product Name Already Exists', () => {
  const productRepo = new MockProductRepository(mockProducts)

  new CreateProductService(new ObjectIdGenerator(), productRepo)
    .execute({
      name: 'Test Product 1',
      stock: 10,
      description: 'This is a test product',
      canStockBeDecimal: false,
      price: 100,
    })
    .then((res) => {
      expect(res.isException()).toBe(true)
    })
})
