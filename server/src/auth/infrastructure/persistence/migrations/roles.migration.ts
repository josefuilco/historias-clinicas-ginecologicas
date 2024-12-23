import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RolesMigration implements OnModuleInit {
  constructor(
    @InjectModel(RoleEntity)
    private readonly roleEntity: typeof RoleEntity
  ) {}
  
  async onModuleInit() {
    // Adding admin role
    await this.roleEntity.findOrCreate({
      where: { name: 'Admin' }
    });
    // Adding user role
    await this.roleEntity.findOrCreate({
      where: { name: 'User' }
    });
  }
}