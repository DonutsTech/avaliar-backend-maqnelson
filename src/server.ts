import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import { router } from './routers';
import { initADM } from './utils/initAdmin';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = Express();
app.use(Express.json({ limit: '10mb' }));

app.use(cors());
app.use(router);

const server = http.createServer(app);

server.listen(PORT, () => {
    initADM();
    console.log(`Server is running on port ${PORT}`);
});
