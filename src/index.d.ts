export type Player = {
  nickname: string;
  profilePhoto: string;
  winrate: number;
  level: number;
  id: string;
  isReady: boolean;
};

export type AuthResponse = {
  player: Player;
  token: string;
};

export interface State {
  roomId: string;
  players: Player[];
  user: Player;
  token: string;
  chats: {
    [key: string]: Message[];
  };
}

export type Message = {
  author: {
    nickname: string;
    profileUrl: string;
  };
  message: string;
  time: bigint;
};
