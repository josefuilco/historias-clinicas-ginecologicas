import { AutoIncrement, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { AccountEntity } from "./account.entity";

@Table({ tableName: 'users' })
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING(36), allowNull: false })
  names: string;

  @Column({ type: DataType.STRING(36), allowNull: false })
  lastNames: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(9), allowNull: false })
  cellphone: string;

  @HasOne(() => AccountEntity)
  account: AccountEntity;
}