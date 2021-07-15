import api from "./config.js";

let busStops = [];
let busPositions = [];
let busLines = [];
let estimatedArrival = [];

function auth() {
  return new Promise((resolve, reject) => {
    api.http.all([
      api.http
        .post(
          `https://aiko-olhovivo-proxy.aikodigital.io/Login/Autenticar?token=08e8a3c128b807cabe3cb88157ba243110668aedf48d055856821357aeaafc47`
        )
        .then((result) => {
          console.log(result);
        }),
    ]);
  });
}

export default {
  auth,

  getStops() {
    return new Promise((resolve, reject) => {
      api.http
        .get(
          "https://aiko-olhovivo-proxy.aikodigital.io/Parada/Buscar?termosBusca="
        )
        .then((res) => {
          busStops = res.data;
          resolve(res.data);
        });
    });
  },

  getBusLines() {
    return new Promise((resolve, reject) => {
      api.http
        .get(
          "https://aiko-olhovivo-proxy.aikodigital.io/Linha/Buscar?termosBusca=all"
        )
        .then((res) => {
          busLines = res.data;
          resolve(res.data);
        });
    });
  },

  getBusPositions() {
    return new Promise((resolve, reject) => {
      api.http
        .get("https://aiko-olhovivo-proxy.aikodigital.io/posicao")
        .then((res) => {
          busPositions = res.data;
          resolve(res.data);
        });
    });
  },

  getEstimatedArrival(cp) {
    return new Promise((resolve, reject) => {
      api.http
        .get(
          `https://aiko-olhovivo-proxy.aikodigital.io/Previsao/Parada?codigoParada=${cp}`
        )
        .then((res) => {
          estimatedArrival = res.data;
          resolve(res.data);
        });
    });
  },
};
