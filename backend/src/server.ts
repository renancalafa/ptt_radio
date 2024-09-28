import express, { Application } from 'express';
import cors from 'cors';
import assetRoutes from './routes/assetRoutes';

const app: Application = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/assets', assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
