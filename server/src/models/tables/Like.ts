import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Post from './Post';

@Table({
  tableName: 'likes'
})
export default class Like extends Model<Like> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @ForeignKey(() => User)
  @Column
  useridx!: number;

  @ForeignKey(() => Post)
  @Column
  postidx!: number;
}
