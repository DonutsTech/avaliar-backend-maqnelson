import { error } from 'console';
import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import { router } from './routers';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = Express();
app.use(Express.json());

app.use(cors());
app.use(router);
app.use(error);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
