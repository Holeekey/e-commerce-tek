import { makeProduct, Product } from '../../src/product/dom/product'

export const mockId1 = '685788d2f9cebe15c308db00'
export const mockId2 = '68578594f9cebe15c308daf9'

export const mockProducts: Product[] = [
  makeProduct({
    id: mockId1,
    name: 'Test Product 1',
    stock: 10,
    description: 'This is a test product 1',
    canStockBeDecimal: false,
    price: 100,
    active: true,
  }),
  makeProduct({
    id: mockId2,
    name: 'Test Product 2',
    stock: 2.5,
    description: 'This is a test product 2',
    canStockBeDecimal: true,
    price: 10,
    active: true,
  }),
]
