// app.js
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import product from './controllers/product.js';
import categories from './controllers/categories.js';
import tags from './controllers/tags.js';
import highlights from './controllers/highlights.js';
import attributesRoute from './controllers/attributesRoute.js'; // use import for ESM
import parentCategory from './controllers/parentCategory.js'; // use import for ESM
import layoutimg from './controllers/layoutimg.js'; // use import for ESM
import slidercom from './controllers/slidercom.js'; // use import for ESM
import bannerRoute from './controllers/bannerRoute.js'; // use import for ESM

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoute);
app.use('/api/product', product);
app.use('/api/category', categories);
app.use('/api/attribute', attributesRoute);
app.use('/api/tag', tags);
app.use('/api/highlight', highlights);
app.use('/api/parentCategory', parentCategory);
app.use('/api/layoutimg', layoutimg);
app.use('/api/slidercom', slidercom);
app.use('/api/banner', bannerRoute);

export default app;
