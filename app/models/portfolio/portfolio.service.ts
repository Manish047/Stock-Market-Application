import { Types } from 'mongoose';
import { TradeStatus, TradeType } from '../trade/trade.types';
import TradeModel from '../trade/trade.schema';
import portfolioRepo from './portfolio.repo';
import stockRepo from '../stock/stock.repo';
import { IStock } from '../stock/stock.types';
import { BadRequestError } from '../../utils/errors';

const getPortfolio = async (userId: string) => {
  const [portfolio] = await portfolioRepo.search({ userId: userId });
  if (!portfolio) throw new BadRequestError('User portfolio not created!');
  const stocks = await Promise.all(
    portfolio.stocks.map(async (portfolioStock) => {
      const { stockId, quantity } = portfolioStock;
      const [tradeAggregate] = await TradeModel.aggregate([
        {
          $match: {
            $and: [
              { userId: new Types.ObjectId(userId) },
              { stockId: (stockId as IStock)._id },
              { type: TradeType.BUY },
              { status: TradeStatus.EXECUTED },
            ],
          },
        },
        {
          $group: {
            _id: '$stockId',
            avgPrice: {
              $avg: '$price',
            },
            sumPrice: {
              $sum: {
                $multiply: ['$price', '$quantity'],
              },
            },
          },
        },
      ]);
      const [stockRecord] = await stockRepo.search({ _id: stockId });
      const totalInvested = (tradeAggregate?.avgPrice ?? 0) * quantity;
      const currentValue = stockRecord.price * quantity;
      return {
        stockId: stockRecord._id,
        name: stockRecord.name,
        price: stockRecord.price,
        quantity,
        averagePrice: tradeAggregate?.avgPrice,
        totalInvested: tradeAggregate?.sumPrice,
        currentValue,
        currentReturnsPercentage: ((currentValue - totalInvested) / 1000) * 100,
      };
    }),
  );
  const results = portfolio.toJSON();
  return { ...results, stocks };
};

export default {
  getPortfolio,
};
