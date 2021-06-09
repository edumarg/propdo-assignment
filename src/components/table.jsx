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
  console.log("currencies for table: ", currencies);

  return (
    <React.Fragment>
      <h2>Currencies Table</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">24H CHANGE</TableCell>
              <TableCell align="center">PRICE ($)</TableCell>
              <TableCell align="center">PRICE IN BTC</TableCell>
              <TableCell align="center">MARKET CAP</TableCell>
              <TableCell align="center">VOLUME 24H</TableCell>
              <TableCell align="center">PRICE GRAPH (7D)</TableCell>
              <TableCell align="center">MENU BUTTONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.map((currencie, index) => (
              <TableRow key={currencie.id}>
                <TableCell component="th" scope="row">
                  {currencies.indexOf(currencie)}
                </TableCell>
                <TableCell align="center">{currencie.name}</TableCell>
                <TableCell align="center">{currencie.priceChange1d}</TableCell>
                <TableCell align="center">
                  {currencie.price.toFixed(2)}
                </TableCell>
                <TableCell align="center">{currencie.priceBtc}</TableCell>
                <TableCell align="center">{currencie.marketCap}</TableCell>
                <TableCell align="center">{currencie.volume}</TableCell>
                <TableCell align="center">GRAPH</TableCell>
                <TableCell align="center">Menu</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default CurrencyTable;
