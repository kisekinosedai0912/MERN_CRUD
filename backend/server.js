import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/products.route.js';

dotenv.config();
const app = express();
const PORT = process.env?.PORT || 5000;

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
** Listen to port 5000 and connect to database
*/
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server started at https://localhost:${PORT}`);
});