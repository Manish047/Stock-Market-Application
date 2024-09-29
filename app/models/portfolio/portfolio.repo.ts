import PortfolioModel from './portfolio.schema';

export const search = (filters: Record<string, any>, projection: Record<string, number> = {}) =>
  PortfolioModel.find(filters).select(projection).populate('stocks.stockId');

export default {
  search,
};
