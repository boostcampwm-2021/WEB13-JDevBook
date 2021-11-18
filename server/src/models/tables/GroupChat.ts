import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType
} from 'sequelize-typescript';
import Group from './Group';
import User from './User';

@Table({
  tableName: 'groupchats',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class GroupChat extends Model<GroupChat> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @ForeignKey(() => Group)
  @Column
  groupidx!: number;

  @ForeignKey(() => User)
  @Column
  useridx!: number;

  @Column({ allowNull: false, type: DataType.STRING(1024) })
  content!: string;

  @BelongsTo(() => Group, { foreignKey: 'groupidx', targetKey: 'idx' })
  BTGroupgroupidx?: Group;

  @BelongsTo(() => User, { foreignKey: 'useridx', targetKey: 'idx' })
  BTUseruseridx?: User;
}
