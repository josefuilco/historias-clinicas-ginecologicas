import { Table, Model, Column, DataType, ForeignKey, PrimaryKey, BelongsTo, AutoIncrement } from "sequelize-typescript";
import { RoleEntity } from "./role.entity";
import { Role } from "src/auth/domain/enums/role.enum";
import { UserEntity } from "./user.entity";

@Table({ tableName: 'accounts' })
export class AccountEntity extends Model<AccountEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column({ unique: true, type: DataType.STRING(36), allowNull: false })
  nickname: string;

  @Column({ type: DataType.STRING(60), allowNull: false })
  password: string;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt: Date;

  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => RoleEntity)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: Role.User })
  roleId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @BelongsTo(() => RoleEntity)
  role: RoleEntity;
}