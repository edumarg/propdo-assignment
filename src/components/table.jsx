import React, { useContext, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import useStyles from "./../styles/tableStyles";
import CurrenciesContext from "./../context/currenciesContext";
import DeleteCurrencyContext from "./../context/deleteCurrencyContext";
import AddToCompareContext from "./../context/addToCompareContext";

const CurrencyTable = () => {
  const classes = useStyles();

  const currencies = useContext(CurrenciesContext);
  const addToCompare = useContext(AddToCompareContext);
  const deleteCurrency = useContext(DeleteCurrencyContext);

  const [openTableMenus, setOpenTableMenus] = useState([]);

  const handleClickTableMenu = (currency, event) => {
    let tableMenus = [...openTableMenus];
    const index = currencies.indexOf(currency);
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleCloseTableMenu = (currency) => {
    let tableMenus = [...openTableMenus];
    const index = currencies.indexOf(currency);
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };
  console.log("anchors: ", openTableMenus);

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
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">PRICE IN BTC</TableCell>
              <TableCell align="center">MARKET CAP</TableCell>
              <TableCell align="center">VOLUME 24H</TableCell>
              <TableCell align="center">PRICE GRAPH (7D)</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies &&
              currencies.map((currency, index) => (
                <TableRow key={currency.id}>
                  <TableCell component="th" scope="row">
                    {currencies.indexOf(currency) + 1}
                  </TableCell>
                  <TableCell align="center">{currency.name}</TableCell>
                  <TableCell align="center">{currency.priceChange1d}</TableCell>
                  <TableCell align="center">
                    {`$${currency.price.toFixed(2)}`}
                  </TableCell>
                  <TableCell align="center">{currency.priceBtc}</TableCell>
                  <TableCell align="center">{`$${currency.marketCap}`}</TableCell>
                  <TableCell align="center">{currency.volume}</TableCell>
                  <TableCell align="center">GRAPH</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label={`${currency.name}-more`}
                      aria-controls={`${currency.name}-menu`}
                      aria-haspopup="true"
                      onClick={(event) => handleClickTableMenu(currency, event)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id={`${currency.name}-menu`}
                      anchorEl={openTableMenus[index]}
                      keepMounted
                      open={Boolean(openTableMenus[index])}
                      onClose={(event) => handleCloseTableMenu(currency)}
                    >
                      <MenuItem
                        onClick={(event) => {
                          handleCloseTableMenu(currency);
                          addToCompare(currency);
                        }}
                      >
                        Add to Compare
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseTableMenu(currency);
                          deleteCurrency(currency);
                        }}
                      >
                        Delete Row
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default CurrencyTable;
