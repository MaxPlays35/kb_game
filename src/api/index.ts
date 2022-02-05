import { io, Socket } from "socket.io-client";
import router from "@/router";
import store, { Player } from "@/store";

export class Api {
  private connecion: Socket;

  constructor() {
    this.connecion = io("ws://127.0.0.1:5000/game");
    this.connecion.emit(
      "auth",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6InRlc3QiLCJwcm9maWxlUGhvdG8iOiIiLCJ3aW5yYXRlIjo3MCwibGV2ZWwiOjF9.Ebt4XU-dWZwgvhP5uZwT7E-B1lyVJgVYWNQ6C02NSnM"
    );
    this.connecion.on("user_joined", (player: Player) => {
      store.dispatch("addPlayer", player);
    });
    this.connecion.on("error", (error) => {
      console.error(error);
    });
    // this.connecion.on("created_room", ())
    this.connecion.on("users_list", (playersList) => {
      store.dispatch("updatePlayers", playersList);
    });
  }

  public connect(roomId: string): void {
    this.connecion.emit("join_room", { roomId });
    router.push("/waiting");
  }

  public createRoom(): void {
    this.connecion.emit("create_room");
    router.push("/waiting");
  }
}
