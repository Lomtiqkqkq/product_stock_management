import express from 'express';
import { config } from 'dotenv';
import historyRoute from './routes/history.route.js';
import { connectToDatabase } from './db/postgres.data.source.js';

config()
async function bootstrap() {
  const app = express()
  const port = process.env.PORT || 2000;
  await connectToDatabase()
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('history', historyRoute)
  app.listen(port, ()=>{console.log('Listening on port ' + port)});
}
bootstrap()
