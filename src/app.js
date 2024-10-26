import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRouter from './routes/index.js';
import logger from './middlewares/logger.js';
import connectDB from './db.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware and routes setup
app.use(express.json());
app.use(logger);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRouter);

// Database connection
connectDB();

// HTTP & HTTPS Servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync('../cert/privkey.pem'),
    cert: fs.readFileSync('../cert/cert.pem'),
  },
  app
);

// Start servers
const PORT_HTTP = process.env.PORT_HTTP || 80;
const PORT_HTTPS = process.env.PORT_HTTPS || 443;

httpServer.listen(PORT_HTTP, () => {
  console.log(`HTTP server running on port ${PORT_HTTP}`);
});

httpsServer.listen(PORT_HTTPS, () => {
  console.log(`HTTPS server running on port ${PORT_HTTPS}`);
});

export default app;
