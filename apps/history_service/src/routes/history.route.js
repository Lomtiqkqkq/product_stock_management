import express from 'express';
import { HistoryController } from '../controllers/history.controller.js';


const historyRoute = express.Router();
const historyController = new HistoryController();
historyRoute.get('/', historyController.getHistory);
export default historyRoute;
