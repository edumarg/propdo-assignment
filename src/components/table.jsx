import React, { useContext } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useStyles from "./../styles/tableStyles";
import CurrenciesContext from "./../context/currenciesContext";

const CurrencyTable = () => {
  const classes = useStyles();
  const currencies = useContext(CurrenciesContext);

  return (
    <React.Fragment>
      <h2>Currencies Table</h2>
    </React.Fragment>
  );
};

export default CurrencyTable;
