import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType
} from 'sequelize-typescript';
import Post from './Post';
import User from './User';

@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @ForeignKey(() => Post)
  @Column
  postidx!: number;

  @ForeignKey(() => User)
  @Column
  useridx!: number;

  @Column({ allowNull: false, type: DataType.STRING(1024) })
  comments!: string;

  @BelongsTo(() => Post, { foreignKey: 'postidx', targetKey: 'idx' })
  BTPostpostidx?: Post;

  @BelongsTo(() => User, { foreignKey: 'useridx', targetKey: 'idx' })
  BTUseruseridx?: User;
}
