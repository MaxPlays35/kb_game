import { io, Socket } from "socket.io-client";
import router from "@/router";
import store, { Player } from "@/store";

export default class Api {
  private connecion: Socket;

  constructor() {
    this.connecion = io("ws://127.0.0.1:10000/game");
    this.connecion.on("user_joined", (player: Player) => {
      store.dispatch("addPlayer", player);
    });
    this.connecion.on("error", (error) => {
      console.error(error);
    });
    this.connecion.on("users_list", (playersList) => {
      store.dispatch("updatePlayers", playersList);
    });

    this.connecion.on("readiness_player", (data) => {
      store.dispatch("updateReady", data);
    });

    this.connecion.on("room_id", (roomId: string) => {
      store.state.roomId = roomId;
      router.push("/waiting");
    });

    this.connecion.on("authed", (player: Player) => {
      store.state.user = player;
    });

    this.connecion.on("player_leaved", (data) => {
      store.dispatch("removePlayer", data);
    });

    this.connecion.on("all_ready", () => {
      router.push("/game");
    });
  }

  public connect(roomId: string): void {
    this.connecion.emit("join_room", { roomId, id: store.state.user.id });
    store.state.roomId = roomId;
    router.push("/waiting");
  }

  public createRoom(): void {
    this.connecion.emit("create_room", { id: store.state.user.id });
  }

  public changeReady(): void {
    store.state.user.isReady = !store.state.user.isReady;
    this.connecion.emit("ready_player", {
      id: store.state.user.id,
      isReady: store.state.user.isReady,
      roomId: store.state.roomId
    });
  }

  public auth(): void {
    this.connecion.emit("auth", store.state.token);
  }

  public leaveRoom(): void {
    this.connecion.emit("leave_room", {
      id: store.state.user.id,
      roomId: store.state.roomId
    });
    store.state.roomId = "";
    store.state.user.isReady = false;
    router.push("/");
  }
}
