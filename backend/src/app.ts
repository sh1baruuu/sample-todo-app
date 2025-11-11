import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/users.routes';

const app = express();
app.use(json());
app.use('/api/users', userRoutes);

export default app;
