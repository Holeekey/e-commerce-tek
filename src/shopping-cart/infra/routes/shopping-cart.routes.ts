import { Router } from 'express'

export const shoppingCartRouter = Router()

shoppingCartRouter.get('/', (req, res) => {
  res.send({
    message: 'Shopping cart retrieved successfully',
    items: [],
  })
})

shoppingCartRouter.post('/add', (req, res) => {
  const { productId, quantity } = req.body
  res.send({
    message: 'Product added to cart successfully',
    productId,
    quantity,
  })
})

shoppingCartRouter.post('/remove', (req, res) => {
  const { productId } = req.body
  res.send({
    message: 'Product removed from cart successfully',
    productId,
  })
})
