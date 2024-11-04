import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import indexRouter from './routes/index.js';
import logger from './middlewares/logger.js'; 
import connectDB from './db.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware and routes setup
// Session middleware setup
app.use(
  session({
      secret: '3jdfmbm4sd6oiofg7ipo04', 
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600000 } 
  })
);
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(logger);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRouter);

// Database connection
connectDB();

// HTTP & HTTPS Servers
const httpServer = http.createServer(app);

// Start servers
const PORT_HTTP = process.env.PORT || 3000;

httpServer.listen(PORT_HTTP, () => {
  console.log(`HTTP server running on port ${PORT_HTTP}`);
});

export default app;
