import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  username: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("text")
  description: string;

  @Column("varchar")
  gender: string;
}
