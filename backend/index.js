import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
