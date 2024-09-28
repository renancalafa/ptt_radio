import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import assetRoutes from './routes/assetRoutes'; 
// import exchangeRoutes from './routes/exchangeRoutes'; 

const app: Application = express();

app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 

app.get('/', (req: Request, res: Response) => {
  res.send('API Functional!');
});

app.use('/assets', assetRoutes); 
// app.use('/exchanges', exchangeRoutes); 

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server error!' });
});

export default app;
