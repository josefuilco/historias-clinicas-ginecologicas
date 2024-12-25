import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { envs } from "../config/env.config";

export const sequelizeDatabase: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: envs.MYSQL_HOST,
  port: envs.MYSQL_PORT,
  username: envs.MYSQL_USERNAME,
  password: envs.MYSQL_PASSWORD,
  database: envs.MYSQL_DATABASE,
  pool: {
    min: 0,
    max: 5,
  },
  models: [__dirname + '../../../**/infrastructure/persistence/entities/*.entity.ts'],
  autoLoadModels: envs.IS_DEVELOPMENT,
  synchronize: envs.IS_DEVELOPMENT,
  sync: { alter: envs.IS_DEVELOPMENT },
  define: { timestamps: false },
  logging: envs.IS_DEVELOPMENT
    ? console.log
    : false
}