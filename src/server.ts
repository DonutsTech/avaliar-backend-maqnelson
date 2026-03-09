import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import { StatusCodes } from 'http-status-codes';
import { setErrors } from './middleware';
import { router } from './routers';
import { initADM } from './utils/initAdmin';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);

const app = Express();
app.use(Express.json({ limit: '10mb' }));

app.use(cors());
app.use(router);
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        message: "Rota não encontrada",
    });
});
app.use(setErrors);

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    initADM();
    console.log(`Server is running on port ${PORT}`);
});
