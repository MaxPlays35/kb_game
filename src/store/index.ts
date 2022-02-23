import { createStore } from "vuex";
import HttpApi from "@/api/axios";
import router from "@/router";

const httpApi = new HttpApi();

export type Player = {
  nickname: string;
  profilePhoto: string;
  winrate: number;
  level: number;
  id: string;
  isReady: boolean;
  peerId: string;
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
    [key: string]: Chat;
  };
}

export type Chat = {
  name: string;
  messages: Message[];
};

export type Message = {
  author: {
    nickname: string;
    profileUrl: string;
  };
  message: string;
  time?: string;
  peerId: string;
};

export default createStore<State>({
  actions: {
    addPlayer({ commit }, player: Player) {
      commit("addPlayer", player);
    },
    updatePlayers({ commit }, players: Player[]) {
      commit("updatePlayers", players);
    },
    updateReady({ commit }, data) {
      commit("updateReady", data);
    },
    async login({ commit }) {
      const response: AuthResponse = await httpApi.login();
      console.log(response);

      commit("login", response);
      router.push("/connect");
    },
    removePlayer({ commit }, data) {
      commit("removePlayer", data.id);
    },
    joinRoom({ commit }, roomId) {
      commit("setRoom", roomId);
    },
    addMessage({ commit }, data: Message) {
      commit("addMessage", data);
    }
  },
  state: {
    roomId: "",
    players: [],
    user: {
      nickname: "",
      profilePhoto: "",
      winrate: 50.2,
      level: 1,
      id: "",
      isReady: false,
      peerId: ""
    },
    token: "",
    chats: {}
  },
  mutations: {
    addPlayer(state, player: Player) {
      state.players.push(player);
      state.chats[player.peerId] = {
        name: player.nickname,
        messages: []
      };
    },
    updatePlayers(state, players: Player[]) {
      state.players = players;
      for (const player of players) {
        state.chats[player.peerId] = {
          name: player.nickname,
          messages: []
        };
      }
    },
    updateReady(state, data) {
      const player: Player | undefined = state.players.find(
        (pl) => pl.id == data.id
      );
      if (player) {
        player.isReady = data.isReady;
      }
    },
    login(state, data: AuthResponse) {
      state.user = data.player;
      state.token = data.token;
    },
    removePlayer(state, id: string) {
      console.log(id, state.players);
      console.log(state.players.filter((item) => item.id != id));
      state.players = state.players.filter((item) => item.id !== id);
    },
    setRoom(state, roomId) {
      state.roomId = roomId;
      state.chats[state.roomId] = {
        name: "Social",
        messages: []
      };
    },
    addMessage(state, data: Message) {
      state.chats[data.peerId].messages.push(data);
    }
  },
  modules: {}
});
