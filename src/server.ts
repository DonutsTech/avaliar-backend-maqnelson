import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import App from './config/app';
import { initADM } from './utils/initAdmin';
import { initMarkWheels } from './utils/initMarkWheels';

dotenv.config({
  path: path.resolve('.env'),
});

const PORT = parseInt(process.env.PORT || '3000', 10);

const app = new App().express;

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    initADM();
    initMarkWheels();
    console.log(`Server is running on port ${PORT}`);
});
