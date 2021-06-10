import React from "react";
import LineChart from "./linearChart";
import CompareList from "./compareList";

const Charts = () => {
  return (
    <React.Fragment>
      <h2>Charts</h2>
      <CompareList />
      <LineChart />
    </React.Fragment>
  );
};

export default Charts;
