import stockRepo from './stock.repo';
import { IStock } from './stock.types';

const getStocks = (filters: Record<string, any> = {}, projection: Record<string, number> = {}) =>
  stockRepo.search(filters, projection);

const addStock = (stock: IStock) => stockRepo.insert(stock);

const updateStock = (stockId: string, stock: IStock) => stockRepo.updateOne({ _id: stockId }, stock);

export default {
  getStocks,
  addStock,
  updateStock,
};
