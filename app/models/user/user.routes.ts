import { Router, Request, Response } from 'express';
import { tryCatchWrapper } from '../../utils/try-catch-wrapper';
import { ResponseFactory } from '../../utils/response';
import userService from './user.service';

const router = Router();

router.post(
  '/login',
  tryCatchWrapper(async (request: Request, response: Response) => {
    const results = await userService.loginUser(request.body.email, request.body.password);
    return response.status(200).send(new ResponseFactory(true, results));
  }),
);

export default router;
