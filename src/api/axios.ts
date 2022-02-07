import axios, { AxiosInstance } from "axios";

interface Player {
  nickname: string;
  profilePhoto: string;
  winrate: number;
  level: number;
  id: string;
  isReady: boolean;
  token: string;
}

export type AuthResponse = {
  player: Player;
  token: string;
};

class HttpApi {
  readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://192.168.1.63:5000/"
    });
  }

  public async login(): Promise<AuthResponse> {
    const { data } = await this.httpClient.post("login");
    return data;
  }
}

export default HttpApi;
