import { ShoppingCart } from '../../src/shopping-cart/app/models/shopping-cart'
import { mockProductId1, mockProductId2 } from './product-mock.data'

export const mockUserId1 = '685788d2f9cebe15c308db00'
export const mockUserId2 = '68578594f9cebe15c308daf9'

export const mockCarts: ShoppingCart[] = [
  {
    userId: mockUserId1,
    items: [],
  },
  {
    userId: mockUserId2,
    items: [
      {
        productId: mockProductId1,
        quantity: 2,
      },
      {
        productId: mockProductId2,
        quantity: 100,
      },
    ],
  },
]
