import TradeModel from './trade.schema';
import { ITrade } from './trade.types';

const search = (filters: Record<string, any>, projection: Record<string, number> = {}) =>
  TradeModel.find(filters).select(projection).populate('stockId');

const insert = (trade: ITrade) => new TradeModel(trade).save();

const update = (filters: Record<string, any>, trade: Partial<ITrade>) => TradeModel.updateOne(filters, trade);

const deleteOne = (filters: Record<string, any>) => TradeModel.deleteOne(filters);

export default {
  search,
  insert,
  update,
  deleteOne,
};
