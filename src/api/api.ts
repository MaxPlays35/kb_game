import { App } from "vue";
import Api from "./index";

export default {
  install: (app: App): void => {
    const api = new Api();
    app.config.globalProperties.$api = api;

    app.provide("api", api);
  }
};
