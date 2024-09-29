import express from 'express';
import { registerRoutes } from './routes';
import { MongoConnection } from './connections/mongo';

export const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

    await MongoConnection.createConnection();
    console.log('Connected to DB');

    registerRoutes(app);

    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server!', error);
  }
};
