import axios from "axios";
import { token } from "./token.js";

const instance = axios.create({
  baseURL: "http://127.0.0.1:80",
});

instance.interceptors.request.use(
  async (config) => {
    const authToken = await token();

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
