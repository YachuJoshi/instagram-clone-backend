import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base";
import { Post } from "../post";

@Entity("media")
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true })
  url: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
