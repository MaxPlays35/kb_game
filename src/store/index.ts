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
}

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
      isReady: false
    },
    token: ""
  },
  mutations: {
    addPlayer(state, player: Player) {
      state.players.push(player);
    },
    updatePlayers(state, players: Player[]) {
      state.players = players;
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
    }
  },
  modules: {}
});
