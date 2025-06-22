import { CreateProductDTO } from '../../product/infra/dto/create-product.dto'

export const productData: CreateProductDTO[] = [
  {
    name: 'Macbook Pro 16',
    description:
      'Laptop Apple Macbook Pro 16 pulgadas con chip M1 Pro, 16GB RAM, 512GB SSD',
    price: 2499.99,
    stock: 150,
    canStockBeDecimal: false,
  },
  {
    name: 'iPhone 14 Pro',
    description:
      'Smartphone Apple iPhone 14 Pro con pantalla de 6.1 pulgadas, 128GB almacenamiento',
    price: 1099.99,
    stock: 300,
    canStockBeDecimal: false,
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description:
      'Smartphone Samsung Galaxy S23 Ultra con pantalla de 6.8 pulgadas, 256GB almacenamiento',
    price: 1199.99,
    stock: 200,
    canStockBeDecimal: false,
  },
  {
    name: 'Dell XPS 13',
    description:
      'Laptop Dell XPS 13 con pantalla de 13.4 pulgadas, Intel Core i7, 16GB RAM, 512GB SSD',
    price: 1499.99,
    stock: 100,
    canStockBeDecimal: false,
  },
  {
    name: 'Kilo Cafe San Domingo',
    description: 'Cafe San Domingo, 100% arábica, molido, 500g',
    price: 10.99,
    stock: 216.7,
    canStockBeDecimal: true,
  },
]
