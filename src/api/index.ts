import { io, Socket } from "socket.io-client";
import router from "@/router";

export class Api {
  private connecion: Socket;

  constructor() {
    this.connecion = io("ws://127.0.0.1:5000/game");
    // this.connecion.emit("qq", ["dasdsdd"]);
  }

  public connect(roomId: string, name: string): void {
    this.connecion.emit("join_room", { roomId, name });
    router.push("/waiting");
  }
}
