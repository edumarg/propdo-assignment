import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@material-ui/core/CssBaseline";

import SideBar from "./components/sideBar";
import Table from "./components/table";
import Charts from "./components/charts";

import useStyles from "./styles/drawerStyles";
import CurrenciesContext from "./context/currenciesContext";
import { getCurrencies } from "./services/currenciesServices";

import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currencies, setCurrenciesState] = useState();

  const populateCurrencies = async () => {
    const response = await getCurrencies();
    const currencies = response.data;
    setCurrenciesState(currencies);
  };

  useEffect(() => populateCurrencies(), []);

  console.log("currencies: ", currencies);

  const classes = useStyles();

  return (
    <React.Fragment>
      <ToastContainer />
      <CurrenciesContext.Provider value={currencies}>
        <div className={classes.root}>
          <CssBaseline />
          <SideBar />
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route
                path={"/currencies"}
                render={(props) => <Table {...props} />}
              />
              <Route
                path={"/charts"}
                render={(props) => <Charts {...props} />}
              />
              <Redirect exact from="/" to="/currencies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      </CurrenciesContext.Provider>
    </React.Fragment>
  );
};

export default App;
