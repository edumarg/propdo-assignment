import http from "./httpServices";

// As API we use https://documenter.getpostman.com/view/5734027/RzZ6Hzr3?version=latest

// Get the first 100 cryptocurrencies with prices in USD ($)

export const getCurrencies = () => {
  return http.get("/coins?skip=0&limit=100&currency=USD");
};

export const getCurrencyChart = (currency, period) => {
  return http.get(`/charts?period=${period}&coinId=${currency}`);
};
