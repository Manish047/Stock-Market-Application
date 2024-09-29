import StockModel from './stock.schema';
import { IStock } from './stock.types';

const search = (filters: Record<string, any> = {}, projection: Record<string, number> = {}) =>
  StockModel.find(filters).select(projection);

const insert = (stock: IStock) => new StockModel({ ...stock }).save();

const updateOne = (filters: Record<string, any>, stock: IStock) => StockModel.updateOne(filters, stock);

export default {
  search,
  insert,
  updateOne,
};
