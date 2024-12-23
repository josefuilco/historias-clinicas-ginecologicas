import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountEntity } from "./entities/account.entity";
import { ACCOUNT_REPOSITORY } from "src/auth/domain/repositories/account.repository";
import { MysqlAccountRepository } from "./repositories/mysqlAccount.repository";
import { RoleEntity } from "./entities/role.entity";
import { RolesMigration } from "./migrations/roles.migration";

@Module({
  imports: [SequelizeModule.forFeature([AccountEntity, RoleEntity])],
  providers: [
    RolesMigration,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: MysqlAccountRepository
    }
  ],
  exports: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: MysqlAccountRepository
    }
  ],
})
export class PersistenceModule {}