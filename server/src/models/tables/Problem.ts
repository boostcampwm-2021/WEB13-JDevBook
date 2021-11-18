import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import Group from './Group';
import User from './User';
import UserProblem from './UserProblem';

@Table({
  tableName: 'problems',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class Problem extends Model<Problem> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @ForeignKey(() => Group)
  @Column
  groupidx!: number;

  @Column({ allowNull: false, type: DataType.STRING(1024) })
  question!: string;

  @Column({ allowNull: false })
  answer!: boolean;

  @BelongsTo(() => Group, { foreignKey: 'groupidx', targetKey: 'idx' })
  BTGroupgroupidx?: Group;

  @BelongsToMany(() => User, {
    through: () => UserProblem,
    foreignKey: 'problemidx'
  })
  BTMUserProblemproblemidx?: User[];
}
