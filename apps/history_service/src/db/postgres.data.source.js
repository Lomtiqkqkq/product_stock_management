import { config } from 'dotenv';
import {Sequelize} from "sequelize";


config()
export const InitPostgres = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    define: {
      timestamps: false,
    },
  }
)

export async function connectToDatabase() {
  try {
    await InitPostgres.authenticate()
    await InitPostgres.sync()
    console.log('СУБД Postgres успешно подключена.')
    return true
  } catch (e) {
    throw new Error('Ошибка подключения Postgres')
  }
}
