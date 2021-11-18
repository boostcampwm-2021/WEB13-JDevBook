export interface IMessage {
  currentUserName: string;
  sender: string;
}

export interface ISocketMessageBase {
  sender: string;
  receiver: string;
}

export interface ISocketMessage extends ISocketMessageBase {
  msg: string;
}

export interface ISuccessiveMessage extends ISocketMessageBase {
  flag: boolean;
}