import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
