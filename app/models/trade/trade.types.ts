import { IStock } from '../stock/stock.types';

export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum TradeStatus {
  EXECUTED = 'EXECUTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export interface ITrade {
  _id?: string;
  userId: string;
  portfolioId: string;
  stockId: string | IStock;
  quantity: number;
  price: number;
  type: TradeType;
  status: TradeStatus;
  executedBy?: string;
}
