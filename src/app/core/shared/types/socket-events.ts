export interface ServerToClientEvents {
  receiveMessage: (payload: ChatMessagePayload) => void;
}

export interface ChatMessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface JoinChatPayload {
  senderId: string;
  receiverId: string;
}

export interface ClientToServerEvents {
  sendMessage: (payload: ChatMessagePayload) => void;
  joinChat: (payload: JoinChatPayload) => void;
}
