import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
  Unique,
  DataType
} from 'sequelize-typescript';
import Group from './Group';
import Like from './Like';
import Post from './Post';
import UserGroup from './UserGroup';
import _Comment from './Comment';
import Alarm from './Alarm';
import GroupChat from './GroupChat';
import Problem from './Problem';
import UserProblem from './UserProblem';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @Unique
  @Column({ type: DataType.STRING(32) })
  nickname!: string;

  @Column({ type: DataType.STRING(1024) })
  profile!: string;

  @Column({ type: DataType.STRING(1024) })
  cover!: string;

  @Column({ type: DataType.STRING(100) })
  bio!: string;

  @Column({ allowNull: false, defaultValue: false })
  loginstate!: boolean;

  @BelongsToMany(() => Group, {
    through: () => UserGroup,
    foreignKey: 'useridx'
  })
  BTMUserGroupuseridx?: Group[];

  @HasMany(() => Post, { foreignKey: 'useridx', sourceKey: 'idx' })
  HMPostuseridx?: Post[];

  @BelongsToMany(() => Post, { through: () => Like, foreignKey: 'useridx' })
  BTMLikeuseridx?: Post[];

  @HasMany(() => _Comment, { foreignKey: 'useridx', sourceKey: 'idx' })
  HMCommentuseridx?: _Comment[];

  @HasMany(() => Alarm, { foreignKey: 'useridx', sourceKey: 'idx' })
  HMAlarmuseridx?: Alarm[];

  @HasMany(() => GroupChat, { foreignKey: 'useridx', sourceKey: 'idx' })
  HMGroupChatuseridx?: GroupChat[];

  @BelongsToMany(() => Problem, {
    through: () => UserProblem,
    foreignKey: 'useridx'
  })
  BTMUserProblemuseridx?: Problem[];
}
