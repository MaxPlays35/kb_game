import { createStore } from "vuex";

export type Player = {
  nickname: string;
  profilePhoto: string;
  winrate: number;
  level: number;
  id: string;
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
      commit("updatePlayes", players);
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
      id: ""
    },
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Mzk4ODIxNiwianRpIjoiMDFjZDU0MjktNGJmZi00MWYzLWFlZmMtNzI4MGJkNzM4NzAzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJuaWNrbmFtZSI6InRlc3QiLCJwcm9maWxlSW1hZ2UiOiJicmF5dGVjaC5wbmciLCJ3aW5yYXRlIjo1MCwibGV2ZWwiOjF9LCJuYmYiOjE2NDM5ODgyMTYsImV4cCI6MTY0Mzk4OTExNn0.CK4bb0NnhpgPeq1PlZlsO7nBv2hyG91Qi3-aZppIS7s"
  },
  mutations: {
    addPlayer(state, player: Player) {
      state.players.push(player);
    },
    updatePlayers(state, players: Player[]) {
      state.players = players;
    }
  },
  modules: {}
});
