import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import User from './User';
import Post from './Post';
import Problem from './Problem';

@Table({
    tableName: 'userproblems',
    timestamps: true,
    paranoid: true
})
export default class UserProblem extends Model<UserProblem> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @ForeignKey(() => User)
    @Column
    useridx!: number;

    @ForeignKey(() => Problem)
    @Column
    problemidx!: number;

    @Column
    correct!: boolean;
}