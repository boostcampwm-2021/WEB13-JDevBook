import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'chats',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class Chat extends Model<Chat> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @Column({
    allowNull: false
  })
  senderidx!: number;

  @Column({
    allowNull: false
  })
  receiveridx!: number;

  @Column({
    type: DataType.STRING(1024),
    allowNull: false
  })
  content!: string;
}
