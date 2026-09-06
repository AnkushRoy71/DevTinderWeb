import { ConnectionModel } from "./connection.model";

export interface RequestModel {
  _id: string;
  senderId: SenderId;
  receiverId: string;
  status: string;
  __v: number;
}

export interface SenderId extends ConnectionModel{

}