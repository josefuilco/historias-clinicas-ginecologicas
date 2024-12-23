import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { envs } from "../config/env.config";
import { RoleEntity } from "src/auth/infrastructure/persistence/entities/role.entity";
import { UserEntity } from "src/auth/infrastructure/persistence/entities/user.entity";
import { AccountEntity } from "src/auth/infrastructure/persistence/entities/account.entity";

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
  models: [
    RoleEntity,
    UserEntity,
    AccountEntity
  ],
  autoLoadModels: envs.IS_DEVELOPMENT,
  synchronize: envs.IS_DEVELOPMENT,
  sync: { alter: envs.IS_DEVELOPMENT },
  define: { timestamps: false },
  logging: envs.IS_DEVELOPMENT
    ? console.log
    : false
}