import axios, { AxiosInstance } from "axios";

interface Player {
  nickname: string;
  profilePhoto: string;
  winrate: number;
  level: number;
  id: string;
  isReady: boolean;
  isAlive: boolean;
  token: string;
  peerId: string;
}

export type AuthResponse = {
  player: Player;
  token: string;
};

export type Creds = {
  login: string;
  password: string;
};

class HttpApi {
  readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://192.168.1.63:10000/"
    });
  }

  public async login(creds: Creds): Promise<AuthResponse> {
    const { data } = await this.httpClient.post("login", creds);

    return data;
  }

  public async register(creds: Creds): Promise<AuthResponse> {
    const { data } = await this.httpClient.post("register", creds);

    return data;
  }
}

export default HttpApi;
