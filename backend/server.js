import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/products.route.js';

dotenv.config();
const app = express();

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
app.listen(5000, () => {
    dbConnection();
    console.log('Server started at https://localhost:5000')
});