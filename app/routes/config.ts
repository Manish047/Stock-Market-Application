import type { Router } from 'express';
import userRouter from '../models/user/user.routes';
import stockRouter from '../models/stock/stock.routes';
import tradeRouter from '../models/trade/trade.routes';
import portfolioRouter from '../models/portfolio/portfolio.routes';

export const routeMap: Array<{ path: string; router: Router }> = [
  { path: '/users', router: userRouter },
  { path: '/stocks', router: stockRouter },
  { path: '/trades', router: tradeRouter },
  { path: '/portfolios', router: portfolioRouter },
];

export const unrestrictedPaths = [{ path: '/users/login', method: 'POST' }];
