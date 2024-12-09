import { Repository } from 'typeorm';
import { StockEntity } from '../entity/stock.entity';
import { logAction } from '../events/json.rpc.client';
interface ICountUpdateInput {
  stock_id: number;
  shop_id: number;
  count_in_the_storage?: number;
  count_in_order?: number;
}
interface ICountFilter {
  plu?: number;
  shop_id?: number;
  count_in_the_storage?: { from: number; to: number };
  count_in_order?: { from: number; to: number };
}

export class StockService {
  constructor(private readonly _stocksRepository: Repository<StockEntity>) {}
  async createCount(
    createCountDto: ICountUpdateInput
  ): Promise<StockEntity | undefined> {
    const stock = await this._stocksRepository.findOneBy({
      id: createCountDto.stock_id,
      shop_id: createCountDto.shop_id
    });
    if (!stock) {
      throw new Error('stock not found');
    }
    if (createCountDto.count_in_the_storage) {
      stock.count_in_the_storage = createCountDto.count_in_the_storage;
    }
    if (createCountDto.count_in_order) {
      stock.count_in_order = createCountDto.count_in_order;
    }
    await logAction('createCount', stock);
    return stock;
  }
  async increaseCount(
    increaseCountDto: ICountUpdateInput
  ): Promise<{ message: string; stock: StockEntity }> {
    const stock = await this._stocksRepository.findOneBy({
      id: increaseCountDto.stock_id,
      shop_id: increaseCountDto.shop_id
    });
    if (!stock) {
      throw new Error('stock not found');
    }
    if (increaseCountDto.count_in_order) {
      stock.count_in_order += increaseCountDto.count_in_order;
    }
    if (increaseCountDto.count_in_the_storage) {
      stock.count_in_order += increaseCountDto.count_in_the_storage;
    }
    await logAction('increaseCount', stock);
    return { message: 'count success increase', stock: stock };
  }
  async decreaseCount(
    decreaseCountDto: ICountUpdateInput
  ): Promise<{ message: string; stock: StockEntity }> {
    const stock = await this._stocksRepository.findOneBy({
      id: decreaseCountDto.stock_id,
      shop_id: decreaseCountDto.shop_id
    });
    if (!stock) {
      throw new Error('stock not found');
    }
    if (decreaseCountDto.count_in_order) {
      stock.count_in_order -= decreaseCountDto.count_in_order;
    }
    if (decreaseCountDto.count_in_the_storage) {
      stock.count_in_the_storage -= decreaseCountDto.count_in_the_storage;
    }
    await logAction('decreaseCount', stock);
    return { message: 'count decreased', stock: stock };
  }
  async countFilter(filters: ICountFilter): Promise<StockEntity[]> {
    const catchFilter: Record<string, any> = {};
    if (filters.plu) {
      catchFilter.plu = filters.plu;
    }
    if (filters.shop_id) {
      catchFilter.shop_id = filters.shop_id;
    }
    if (filters.count_in_order) {
      if (filters.count_in_order.from)
        catchFilter.min_order = { $gte: filters.count_in_order.from };
      if (filters.count_in_order.to)
        catchFilter.to_order = { $lte: filters.count_in_order.to };
    }
    if (filters.count_in_the_storage) {
      if (filters.count_in_the_storage.from)
        catchFilter.from_storage = { $gte: filters.count_in_the_storage.from };
      if (filters.count_in_the_storage.to)
        catchFilter.to_storage = { $lte: filters.count_in_the_storage.to };
    }
    await logAction('countFilter', filters);
    return await this._stocksRepository.find({
      where: catchFilter
    });
  }
}
