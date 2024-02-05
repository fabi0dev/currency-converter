import axios from "axios";

const { VITE_CURRENCY_API_KEY } = import.meta.env;

const api = axios.create({
  baseURL: "https://api.currencyapi.com/v3/",
  params: {
    apikey: VITE_CURRENCY_API_KEY,
  },
});

const currencyAPI = {
  getCurrencies: async () => {
    try {
      const { data } = await api.get("currencies");
      return data;
    } catch (e) {
      console.log("error in request latest", e);
    }
  },
  getLatest: async (base_currency = "BRL") => {
    try {
      const { data } = await api.get("latest", {
        params: {
          base_currency,
        },
      });
      return data;
    } catch (e) {
      console.log("error in request latest", e);
    }
  },
  getStatus: async () => {
    try {
      const { data } = await api.get("status");
      return data;
    } catch (e) {
      console.log("error in request latest", e);
    }
  },
};

export default currencyAPI;
