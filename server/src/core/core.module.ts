import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { sequelizeDatabase } from "./infrastructure/database/sequelize.database";

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDatabase)
  ]
})
export class CoreModule {}