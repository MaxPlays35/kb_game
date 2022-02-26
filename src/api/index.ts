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
    this.connecion = io("ws://192.168.1.63:10000/game");
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
      store.dispatch("addMessage", data);
    });
    this.connecion.on("game_state", (data) => {
      store.dispatch("setRoomState", data);
    });
    this.connecion.on("user_state", (data) => {
      store.dispatch("setUserState", data);
    });
    this.connecion.on("error", (data) => {
      store.dispatch("error", data);
    });
    this.connecion.on("finish_connect", (roomId) => {
      store.dispatch("joinRoom", roomId);
      router.push("/waiting");
    });
    this.connecion.on("bankrupt", () => {
      this.clean();

      router.push("/");
      store.state.error = {
        error: "Lose",
        text: "You lose",
        show: true
      };
    });

    this.connecion.on("win", (data) => {
      this.clean();
      store.state.error = {
        error: data.error,
        text: data.text,
        show: true
      };
      router.push("/");
    });
  }

  public connect(roomId: string): void {
    this.connecion.emit("join_room", { roomId, id: store.state.user.id });
  }

  public createRoom(months: number): void {
    this.connecion.emit("create_room", { id: store.state.user.id, months });
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
    console.log(offer);
    this.connecion.emit("buy_offer", { ...offer, roomId: store.state.roomId });
  }

  public sendAuctionOffer(offer: AuctionOffer): void {
    this.connecion.emit("auction_offer", {
      ...offer,
      roomId: store.state.roomId
    });
  }

  public sendProduceOffer(offer: ProduceOffer): void {
    this.connecion.emit("produce_offer", {
      ...offer,
      roomId: store.state.roomId
    });
  }

  public sendBuildOffer(offer: BuildOffer): void {
    this.connecion.emit("build_offer", {
      ...offer,
      roomId: store.state.roomId
    });
  }

  public endMove(): void {
    this.connecion.emit("end_move", {
      playerId: store.state.user.id,
      roomId: store.state.roomId
    });
  }

  private clean(): void {
    store.state.roomState = {
      level: 3,
      volume: 0,
      minPriceRaw: 0,
      maxDestroyers: 0,
      maxPriceDestroyer: 0,
      currentMonth: 1
    };
    store.state.userState = {
      money: 10000,
      raw_materials: 4,
      destroyers: 2,
      manufactories: 2
    };
    store.state.players = [];
    store.state.user.isReady = false;
    store.state.user.isAlive = true;
  }
}
