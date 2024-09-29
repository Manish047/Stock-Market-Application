import type { Application } from 'express';
import { routeMap } from './config';
import { errorMiddleware, notFoundMiddleware } from '../middleware/error';
import { authorize } from '../middleware/auth';

export const registerRoutes = (app: Application) => {
  app.use(authorize);
  for (const route of routeMap) {
    app.use(route.path, route.router);
  }
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
