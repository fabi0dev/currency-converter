import axios from "axios";

const api = axios.create({
  baseURL: "https://api.currencyapi.com/v3/",
});

export default api;
