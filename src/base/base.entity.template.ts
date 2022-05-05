import {
  Entity,
  BaseEntity as TypeORMBaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export interface CommonEntityAttributes {
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity()
export class BaseEntity
  extends TypeORMBaseEntity
  implements CommonEntityAttributes
{
  @Column({ type: "boolean", default: true, nullable: false })
  isActive?: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
