import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import { errorMessage, infoMessage, sucessMessage } from './utils/console';
import { aqmDataSouce } from './config/database';
import routes from './routes';

infoMessage('Starting 🚀');

infoMessage('Connecting Database 🗄️');

aqmDataSouce.initialize().then(async () => {
  sucessMessage('Database Connected 🗄️');

  try {
    infoMessage('Starting Server 🖥️');

    const app = express();

    app.use(json());
    app.use(helmet());
    app.use(cors({ origin: '*' }));
    app.use(routes);
    app.use(errorHandlerMiddleware);
    app.listen(3030, () => sucessMessage('Server Started 🖥️'));
  } catch (error) {
    errorMessage('Error Start Server 🚨', String(error));
  }
}).catch(
  (error) => errorMessage('Error Connecting Database 🚨', String(error)),
);
