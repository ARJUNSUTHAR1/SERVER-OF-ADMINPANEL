// app.js
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import product from './controllers/product.js';
import categories from './controllers/categories.js';
import attributesRoute from './controllers/attributesRoute.js'; // use import for ESM

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoute);
app.use('/api/product', product);
app.use('/api/category', categories);
app.use('/api/attribute', attributesRoute);

export default app;
