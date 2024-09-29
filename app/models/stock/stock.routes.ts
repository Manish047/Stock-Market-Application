import { Router, Request, Response } from 'express';
import stockService from './stock.service';
import { tryCatchWrapper } from '../../utils/try-catch-wrapper';
import { ResponseFactory } from '../../utils/response';
import { createStockValidator, updateStockValidator } from './stock.validator';
import { isPermitted } from '../../middleware/auth';
import { UserRoles } from '../../constants/user-roles';

const router = Router();

router.get(
  '/',
  isPermitted([UserRoles.BROKER, UserRoles.INVESTOR]),
  tryCatchWrapper(async (_request: Request, response: Response) => {
    const results = await stockService.getStocks();
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

router.post(
  '/',
  isPermitted([UserRoles.BROKER]),
  createStockValidator,
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await stockService.addStock(request.body);
    return response.status(201).send(new ResponseFactory(true, results));
  }),
);

router.patch(
  '/:stockId',
  isPermitted([UserRoles.BROKER]),
  updateStockValidator,
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await stockService.updateStock(request.params['stockId'], request.body);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

export default router;
