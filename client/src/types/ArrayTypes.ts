interface messageType {
  msg: string;
  sent: boolean;
}

export interface arrayType {
  room: string;
  messages: messageType[];
  unread: number;
}
