import express from 'express';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { setErrors } from '../middleware';
import { applyRoutersToApp } from '../routers';
import corsConfig from './cors';

export default class App {
  public express: express.Express;

  constructor() {
    this.express = express();
    this.mildleware();
    this.routes();
    this.errorHandler();
    this.notFoundHandler();
  }

  private mildleware(): void {
    this.express.use(express.json({ limit: '50mb' }));
    this.express.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.express.use(corsConfig);
    this.express.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });

    applyRoutersToApp(router);

    this.express.use('/', router);
  }

  private errorHandler(): void {
    this.express.use(setErrors);
  }

  private notFoundHandler(): void {
    this.express.use((_req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({
        STATUS: StatusCodes.NOT_FOUND,
        MESSAGE: 'Rota não encontrada',
      });
    });
  }
}
