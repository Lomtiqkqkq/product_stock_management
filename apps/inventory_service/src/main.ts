import express from 'express';
import { config } from 'dotenv';
import { postgresDataSource } from './db/postgres-data-source';
import productRoute from './routes/product.route';
import stockRoute from './routes/stock.route';
config();
async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  await postgresDataSource
    .initialize()
    .then(() => {
      console.log(`database success connected`);
    })
    .catch((err: Error) => {
      console.error(`failed to connect database: `, err);
    }); // при расширении или подключении нескольких дб вынести в отдельный класс
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('public'));
  app.use('/api/product', productRoute);
  app.use('/api/stocks', stockRoute);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
startServer();
