import { Request, Response, Router } from 'express';
import { isPermitted } from '../../middleware/auth';
import { UserRoles } from '../../constants/user-roles';
import { tryCatchWrapper } from '../../utils/try-catch-wrapper';
import { ResponseFactory } from '../../utils/response';
import tradeService from './trade.service';
import { ITrade, TradeStatus } from './trade.types';
import {
  addTradeValidator,
  deleteTradeValidator,
  executeTradeValidator,
  updateTradeValidator,
} from './trade.validator';

const router = Router();

router.get(
  '/',
  isPermitted([UserRoles.BROKER, UserRoles.INVESTOR]),
  tryCatchWrapper(async (_request: Request, response: Response) => {
    let results: ITrade[] = [];
    if (response.locals.user.role === UserRoles.INVESTOR)
      results = await tradeService.listTrades({ userId: response.locals.user._id });
    else if (response.locals.user.role === UserRoles.BROKER) results = await tradeService.listTrades();
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

router.post(
  '/',
  isPermitted([UserRoles.INVESTOR]),
  addTradeValidator,
  tryCatchWrapper(async (request: Request, response: Response) => {
    const trade: ITrade = request.body;
    trade.userId = response.locals.user._id;
    trade.status = TradeStatus.PENDING;
    const results = await tradeService.addTrade(trade);
    return response.status(201).send(new ResponseFactory(true, results));
  }),
);

router.patch(
  '/:tradeId',
  isPermitted([UserRoles.INVESTOR]),
  updateTradeValidator,
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await tradeService.updateTrade(request.params['tradeId'], request.body);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

router.delete(
  '/:tradeId',
  deleteTradeValidator,
  isPermitted([UserRoles.INVESTOR, UserRoles.INVESTOR]),
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await tradeService.deleteTrade(request.params['tradeId']);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

router.patch(
  '/execute/:tradeId',
  isPermitted([UserRoles.BROKER]),
  executeTradeValidator,
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await tradeService.executeTrade(request.params['tradeId'], response.locals.user._id);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

export default router;
