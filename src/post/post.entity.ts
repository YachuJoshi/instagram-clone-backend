import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base";
import { User } from "../user";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  caption: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
