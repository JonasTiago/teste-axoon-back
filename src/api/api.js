import axios from "axios";
import { token } from "./token.js";

// const url_base = "http://127.0.0.1:80";
const url_base = "http://10.29.0.39:8080";

const instance = axios.create({
  baseURL: url_base,
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
