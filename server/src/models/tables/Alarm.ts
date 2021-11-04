import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import User from './User'

@Table({
    tableName: 'alarms',
    timestamps: true,
    paranoid: true
})
export default class Alarm extends Model<Alarm> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @ForeignKey(() => User)
    @Column
    useridx!: number;

    @Column({ allowNull: false, type: DataType.STRING(1024)})
    message!: string;

    @BelongsTo(() => User, {foreignKey: 'useridx', targetKey: 'idx'})
    BTUseruseridx?: User
}