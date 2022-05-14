import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../base";
import { Post } from "../post";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  @Index()
  username: string;

  @Column("varchar", { select: false })
  password: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("text", { default: "" })
  bio: string;

  @Column("varchar")
  gender: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
