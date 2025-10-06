import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path';
import { dbConnection } from './config/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/products.route.js';

dotenv.config();
const app = express();
const PORT = process.env?.PORT || 5000;
const BASE_URL = process.env?.BASE_URL || 'https://localhost';

app.use(cors({
  origin: ['https://mern-crud-hwf8.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // lets us use JSON response from the request body
/* 
** Defining all routes to use 
** Calling all routes
*/
app.use('/api/products', productRoutes);

/*
** Utilizing the global error handler class from './middleware/errorHandler.js'
*/
app.use(errorHandler);
/*
** Listen to other route path aside from what is defined
*/
const __dirname = path.resolve();

if (process.env?.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
/*
** Listen to port 5000 and connect to database
*/
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server started at ${BASE_URL}:${PORT}`);
});