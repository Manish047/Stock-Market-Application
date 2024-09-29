import { Router, Request, Response } from 'express';
import { tryCatchWrapper } from '../../utils/try-catch-wrapper';
import { isPermitted } from '../../middleware/auth';
import { UserRoles } from '../../constants/user-roles';
import { ResponseFactory } from '../../utils/response';
import portfolioService from './portfolio.service';

const router = Router();

router.get(
  '/',
  isPermitted([UserRoles.INVESTOR]),
  tryCatchWrapper(async (_request: Request, response: Response) => {
    const results = await portfolioService.getPortfolio(response.locals.user._id);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

export default router;
