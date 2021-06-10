import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@material-ui/core/CssBaseline";

import SideBar from "./components/sideBar";
import Table from "./components/table";
import Charts from "./components/charts";

import useStyles from "./styles/drawerStyles";
import CurrenciesContext from "./context/currenciesContext";
import DeleteCurrencyContext from "./context/deleteCurrencyContext";
import AddToCompareContext from "./context/addToCompareContext";
import CompareCurrenciesContext from "./context/compareCurrenciesContext";
import { getCurrencies } from "./services/currenciesServices";

import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const classes = useStyles();
  const [currenciesState, setCurrenciesState] = useState("");
  const [compareCurrenciesState, setCompareCurrenciesState] = useState([]);

  const populateCurrencies = async () => {
    const response = await getCurrencies();
    const currencies = response.data.coins;
    setCurrenciesState(currencies);
  };

  useEffect(() => populateCurrencies(), []);

  const handleAddCompare = (currency) => {
    const myCurrenciesToCompare = [...compareCurrenciesState];
    if (myCurrenciesToCompare.includes(currency)) {
      return;
    } else {
      const currencyToAddCompare = currency;
      setCompareCurrenciesState((prevState) => [
        ...prevState,
        currencyToAddCompare,
      ]);
    }
  };

  const handleRemoveCompare = (currency) => {
    const myCurrenciesToCompare = [...compareCurrenciesState];
    if (!myCurrenciesToCompare.includes(currency)) {
      return;
    } else {
      myCurrenciesToCompare.filter((c) => currency.id !== c.id);
    }
  };

  const handleDelete = (currency) => {
    let myCurrencies = [...currenciesState];
    myCurrencies = myCurrencies.filter((c) => c.name !== currency.name);
    setCurrenciesState(myCurrencies);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <CurrenciesContext.Provider value={currenciesState}>
        <DeleteCurrencyContext.Provider
          value={(currency) => handleDelete(currency)}
        >
          <AddToCompareContext.Provider
            value={(currency) => handleAddCompare(currency)}
          >
            <CompareCurrenciesContext.Provider value={compareCurrenciesState}>
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
            </CompareCurrenciesContext.Provider>
          </AddToCompareContext.Provider>
        </DeleteCurrencyContext.Provider>
      </CurrenciesContext.Provider>
    </React.Fragment>
  );
};

export default App;
