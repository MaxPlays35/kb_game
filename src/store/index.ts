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
  isAlive: boolean;
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
  roomState: {
    level: number;
    volume: number;
    minPriceRaw: number;
    maxDestroyers: number;
    maxPriceDestroyer: number;
    currentMonth: number;
  };
  userState: {
    money: number;
    raw_materials: number;
    destroyers: number;
    manufactories: number;
  };
  isEndOfTurn: boolean;
  buyOffer: boolean;
  produceOffer: boolean;
  auctionOffer: boolean;
  buildOffer: boolean;
  error: {
    error: string;
    text: string;
    show: boolean;
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
    },
    setRoomState({ commit }, data) {
      commit("setRoomState", data);
    },
    setUserState({ commit }, data) {
      commit("setUserState", data);
    },
    error({ commit }, data) {
      commit("setError", data);
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
      isAlive: true,
      peerId: ""
    },
    roomState: {
      level: 3,
      volume: 0,
      minPriceRaw: 0,
      maxDestroyers: 0,
      maxPriceDestroyer: 0,
      currentMonth: 1
    },
    userState: {
      money: 10000,
      raw_materials: 4,
      destroyers: 2,
      manufactories: 2
    },
    token: "",
    chats: {},
    isEndOfTurn: false,
    buyOffer: false,
    produceOffer: false,
    auctionOffer: false,
    buildOffer: false,
    error: {
      error: "",
      text: "",
      show: false
    }
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
    },
    setRoomState(state, data) {
      state.roomState = data;
    },
    setUserState(state, data) {
      state.userState = data;
    },
    setError(state, error) {
      state.error.error = error.error;
      state.error.text = error.text;
      state.error.show = true;
    }
  },
  modules: {}
});
