import {
  Table,
  Column,
  Model,
  Length,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'chats',
  timestamps: true,
  paranoid: true
})
export default class Chat extends Model<Chat> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  //@ForeignKey(() => User)
  @Column({
    allowNull: false
  })
  senderidx!: number;

  //@ForeignKey(() => User)
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
