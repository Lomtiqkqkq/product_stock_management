import { InitPostgres } from '../db/postgres.data.source.js';
import { DataTypes } from 'sequelize';


export const HistoryEntity = InitPostgres.define('history', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  plu: {type: DataTypes.INTEGER},
  name: {type: DataTypes.STRING},
  shop_id: {type: DataTypes.INTEGER},
  product_id: {type: DataTypes.INTEGER},
  count_in_the_storage: {type: DataTypes.INTEGER, defaultValue: 0},
  count_in_order: {type: DataTypes.INTEGER, defaultValue: 0},
  action: {type: DataTypes.STRING},
  date: { type: DataTypes.DATE},
})
