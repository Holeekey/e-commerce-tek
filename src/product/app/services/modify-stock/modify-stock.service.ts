import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { ModifyStockData } from './dto/data'
import { ModifyStockResponse } from './dto/response'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductNotFoundException } from '../../exceptions/not-found'
import { ProductId } from '../../../dom/value-objects/product-id'
import { StockQuantity } from '../../../dom/value-objects/stock-quantity'
import { InvalidStockSubtractionException } from '../../exceptions/invalid-stock-substraction'
import { getDecimalsQuantity } from '../../../../core/utils/functions/get-decimals-quantity'
import { DecimalStockException } from '../../exceptions/decimal-stock'

export class ModifyStockService
  implements ApplicationService<ModifyStockData, ModifyStockResponse>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: ModifyStockData): Promise<Result<ModifyStockResponse>> {
    const productResult = await this.productRepository.findOne(
      new ProductId(data.id)
    )

    if (productResult.isEmpty()) {
      return Result.failure(new ProductNotFoundException())
    }

    const product = productResult.get()

    if (!product.stock.isDecimal && getDecimalsQuantity(data.quantity) > 0) {
      return Result.failure(new DecimalStockException())
    }

    if (data.operation === 'add') {
      product.addStock(new StockQuantity(data.quantity))
    } else if (data.operation === 'subtract') {
      if (product.stock.quantity.isLessThan(new StockQuantity(data.quantity))) {
        return Result.failure(new InvalidStockSubtractionException())
      }
      product.subtractStock(new StockQuantity(data.quantity))
    } else {
      return Result.failure(new Error('Invalid stock operation'))
    }

    await this.productRepository.save(product)

    return Result.success({
      currentStock: product.stock.quantity.value,
    })
  }
}
