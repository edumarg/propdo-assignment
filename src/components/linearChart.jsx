import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [periodState, setPeriodState] = React.useState("24h");

  const getCurrencieData = async (currency, period) => {
    const response = await getCurrencyChart(currency.id, periodState);
    return response.data.chart;
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setPeriodState(event.target.value);
  };

  const createXaxisLabels = async () => {
    const myLabels = [];
    if (!currenciesToCompare[0]) return;
    const data = await getCurrencieData(currenciesToCompare[0]);
    data.map((price) => myLabels.push(new Date(price[0] * 1000)));
    let myData = { ...dataState };
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
    let myData = { ...dataState };
    myData.datasets = datasets;
    setDataState((prevState) => ({ ...prevState, datasets }));
  };

  useEffect(() => {
    createXaxisLabels();
    createDatasets(currenciesToCompare);
  }, [currenciesToCompare, periodState]);

  return (
    <React.Fragment>
      <div>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">Period</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={periodState}
            onChange={(event) => handleChange(event)}
          >
            <MenuItem value="24h">24H</MenuItem>
            <MenuItem value="1w">1 week</MenuItem>
            <MenuItem value="1m">1 month</MenuItem>
            <MenuItem value="3m">3 months</MenuItem>
            <MenuItem value="6m">6 months</MenuItem>
            <MenuItem value="1y">1 year</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Line data={dataState} options={options} />
    </React.Fragment>
  );
};

export default LineChart;
