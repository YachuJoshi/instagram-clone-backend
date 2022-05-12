import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user";
import { Media } from "../media";
import { BaseEntity } from "../base";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  caption: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Media, (media) => media.post)
  medias: Media[];
}
