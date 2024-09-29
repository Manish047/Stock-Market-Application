import { BadRequestError } from '../../utils/errors';
import portfolioRepo from '../portfolio/portfolio.repo';
import tradeRepo from './trade.repo';
import { IStock } from '../stock/stock.types';
import { ITrade, TradeStatus, TradeType } from './trade.types';

const listTrades = async (filters: Record<string, any> = {}) => tradeRepo.search(filters);

const addTrade = async (trade: ITrade) => {
  if (trade.type === TradeType.BUY) {
    return tradeRepo.insert(trade);
  } else {
    const [portfolio] = await portfolioRepo.search({ userId: trade.userId });
    const stockIndex = portfolio.stocks.findIndex(
      (stock: any) => (stock.stockId as IStock)._id?.toString() === trade.stockId,
    );
    if (stockIndex > -1) {
      const { quantity } = portfolio.stocks[stockIndex];
      if (quantity < trade.quantity) {
        throw new BadRequestError("User doesn't have enough stocks to sell!");
      }
    } else {
      throw new BadRequestError("User doesn't have enough stocks to sell!");
    }
    return tradeRepo.insert(trade);
  }
};

const updateTrade = async (tradeId: string, trade: ITrade) => {
  const [tradeRecord] = await tradeRepo.search({ _id: tradeId });
  if (!tradeRecord) {
    throw new BadRequestError("Trade doesn't exists!");
  }
  if (tradeRecord.status !== TradeStatus.PENDING) {
    throw new BadRequestError('Trade has already processed!');
  }
  return tradeRepo.update({ _id: tradeId }, trade);
};

const deleteTrade = async (tradeId: string) => {
  const results = await tradeRepo.deleteOne({ _id: tradeId });
  if (!results.deletedCount) {
    throw new BadRequestError("Trade doesn't exists!");
  }
  return results;
};

const executeTrade = async (tradeId: string, userId: string) => {
  const [trade] = await tradeRepo.search({ _id: tradeId });
  if (!trade) {
    throw new BadRequestError("Trade doesn't exists!");
  }
  const [portfolio] = await portfolioRepo.search({ userId: trade.userId });
  const stockIndex = portfolio.stocks.findIndex((stock: any) => {
    return (stock.stockId as IStock)._id?.toString() === (trade.stockId as IStock)._id?.toString();
  });
  if (stockIndex === -1) {
    // Stock doesn't exists
    if (trade.type === TradeType.BUY) {
      portfolio.stocks.push({ stockId: trade.stockId, quantity: trade.quantity });
    } else {
      throw new BadRequestError("User doesn't have enough stocks to sell!");
    }
  }
  if (stockIndex > -1) {
    // Stock exists
    if (trade.type === TradeType.BUY) {
      portfolio.stocks[stockIndex].quantity = portfolio.stocks[stockIndex].quantity + trade.quantity;
    } else {
      if (portfolio.stocks[stockIndex].quantity < trade.quantity) {
        throw new BadRequestError("User doesn't have enough stocks to sell!");
      }
      portfolio.stocks[stockIndex].quantity = portfolio.stocks[stockIndex].quantity - trade.quantity;
    }
  }
  await portfolio.save();
  return tradeRepo.update({ _id: trade._id }, { status: TradeStatus.EXECUTED, executedBy: userId });
};

export default {
  listTrades,
  addTrade,
  updateTrade,
  deleteTrade,
  executeTrade,
};
