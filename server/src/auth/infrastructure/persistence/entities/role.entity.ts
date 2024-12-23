import { Column, DataType, HasMany, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { AccountEntity } from "./account.entity";

@Table({ tableName: 'roles', timestamps: false })
export class RoleEntity extends Model<RoleEntity> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ unique: true, type: DataType.STRING(20), allowNull: false })
  name: string;

  @HasMany(() => AccountEntity)
  accounts: AccountEntity[];
}