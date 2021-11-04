import { Table, Column, Model, HasMany, BelongsToMany, Length, Unique, DataType } from 'sequelize-typescript'
import GroupChat from './GroupChat';
import Problem from './Problem';
import User from './User';
import UserGroup from './UserGroup'

@Table({
    tableName: 'groups',
    timestamps: true,
    paranoid: true
})
export default class Group extends Model<Group> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @Unique
    @Column({ allowNull: false, type: DataType.STRING(32)})
    title!: string;

    @Column({ type: DataType.STRING(1024)})
    description!: string;

    @Column({ type: DataType.STRING(1024)})
    cover!: string;

    @BelongsToMany(() => User, {through: () => UserGroup, foreignKey: 'groupidx'})
    BTMUserGroupgroupidx?: User[]

    @HasMany(() => GroupChat, {foreignKey: 'groupidx', sourceKey: 'idx'})
    HMGroupChatgroupidx?: GroupChat[]

    @HasMany(() => Problem, {foreignKey: 'groupidx', sourceKey: 'idx'})
    HMProblemgroupidx?: Problem[]   
}