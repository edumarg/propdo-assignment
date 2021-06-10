import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import CompareCurrenciesContext from "./../context/compareCurrenciesContext";

import { getCurrencyChart } from "../services/currenciesServices";

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
      },
    ],
  },
};

const LineChart = () => {
  const currenciesToCompare = useContext(CompareCurrenciesContext);

  const [dataState, setDataState] = useState({ labels: [], datasets: [] });
  const [optionsState, setOptionsState] = useState({});

  const getCurrencieData = async (currency, period) => {
    const response = await getCurrencyChart(currency.id, (period = "1w"));
    return response.data.chart;
  };

  const createXaxisLabels = async () => {
    const myLabels = [];
    if (!currenciesToCompare[0]) return;
    const data = await getCurrencieData(currenciesToCompare[0]);
    data.map((price) => myLabels.push(new Date(price[0] * 1000)));
    let myData = { ...dataState };
    console.log("labels", myLabels);
    myData.labels = myLabels;
    setDataState((prevState) => ({ ...prevState, labels: myLabels }));
  };

  const createDatasets = async (currencies) => {
    const datasets = [];
    await Promise.all(
      currencies.map(async (currency) => {
        const data = [];
        const label = currency.symbol;
        const prices = await getCurrencieData(currency);
        prices.map((price) => data.push(price[1].toFixed(2)));
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const yAxisID = label;
        const dataset = {
          label,
          data,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          yAxisID,
        };
        datasets.push(dataset);
      })
    );
    console.log("data sets", datasets);
    let myData = { ...dataState };
    myData.datasets = datasets;
    setDataState((prevState) => ({ ...prevState, datasets }));
  };

  useEffect(() => {
    createXaxisLabels();
    createDatasets(currenciesToCompare);
  }, []);

  return <Line data={dataState} options={options} />;
};

export default LineChart;
