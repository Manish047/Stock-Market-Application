import { IStock } from '../stock/stock.types';

export interface IPortfolio {
  _id?: string;
  userId: string;
  stocks: Array<{
    stockId: string | IStock;
    quantity: number;
  }>;
}
