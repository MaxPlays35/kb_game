import { io, Socket } from "socket.io-client";
import router from "@/router";
import store, { Message, Player } from "@/store";

type BuyOffer = {
  playerId: string;
  rawMaterials: number;
  price: number;
};

type AuctionOffer = {
  playerId: string;
  destroyers: number;
  price: number;
};

type ProduceOffer = {
  playerId: string;
  destroyers: number;
};

type BuildOffer = {
  playerId: string;
  manufactories: number;
};

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
      store.dispatch("joinRoom", roomId);
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

    this.connecion.on("message_client", (data: Message) => {
      console.log(data);

      store.dispatch("addMessage", data);
    });
    this.connecion.on("game_state", (data) => {
      store.dispatch("setRoomState", data);
    });
    this.connecion.on("user_state", (data) => {
      store.dispatch("setUserState", data);
    });
  }

  public connect(roomId: string): void {
    this.connecion.emit("join_room", { roomId, id: store.state.user.id });
    store.dispatch("joinRoom", roomId);
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

  public sendMessage(message: unknown): void {
    this.connecion.emit("message_server", message);
  }

  public sendBuyOffer(offer: BuyOffer): void {
    this.connecion.emit("buy_offer", offer);
  }

  public sendAuctionOffer(offer: AuctionOffer): void {
    this.connecion.emit("auction_offer", offer);
  }

  public sendProduceOffer(offer: ProduceOffer): void {
    this.connecion.emit("produce_offer", offer);
  }

  public sendBuildOffer(offer: BuildOffer): void {
    this.connecion.emit("build_offer", offer);
  }
}
