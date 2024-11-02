// eslint-disable-next-line import/default
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models';
import { isDevelopment } from '../utils/isDevelopment';
import 'dotenv/config' 
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from '../../env';
import { Game } from './models/Game';
console.log(isDevelopment(), 'ISDEV');


export const createDatabaseClient = (): Sequelize => {
  return new Sequelize({
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT) || 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    // eslint-disable-next-line no-console
    logging: isDevelopment() ? (msg) => console.debug(msg) : undefined,
    models: [ Game, User],
    dialectModule: pg,
  });
};
