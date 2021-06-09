import React, { useContext, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./../styles/tableStyles";
import CurrenciesContext from "./../context/currenciesContext";
import DeleteCurrencyContext from "./../context/deleteCurrencyContext";
import AddToCompareContext from "./../context/addToCompareContext";

const CurrencyTable = () => {
  const BILLION = 1000000000;
  const TRILLION = 1000000000000;
  const MILLION = 1000000;

  const classes = useStyles();

  const currencies = useContext(CurrenciesContext);
  const addToCompare = useContext(AddToCompareContext);
  const deleteCurrency = useContext(DeleteCurrencyContext);

  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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

  const handleTranformBigNum = (num) => {
    if (Math.round(num).toString().length > 12)
      return `${(num / TRILLION).toFixed(2)}T`;
    if (Math.round(num).toString().length > 9)
      return `${(num / BILLION).toFixed(2)}B`;
    if (Math.round(num).toString().length > 6)
      return `${(num / MILLION).toFixed(2)}M`;
    return num.toFixed(2);
  };

  const handleChangePage = (event, newPage) => {
    console.log("handle page change");
    console.log("event", event);
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handle rowschange");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              currencies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((currency, index) => (
                  <TableRow key={currency.id}>
                    <TableCell component="th" scope="row">
                      {currencies.indexOf(currency) + 1}
                    </TableCell>
                    <TableCell align="center">
                      {currency.name}
                      <span className={classes.grey}>-{currency.symbol}</span>
                    </TableCell>
                    <TableCell
                      align="center"
                      className={
                        currency.priceChange1d >= 0
                          ? classes.positiveChange
                          : classes.negativeChange
                      }
                    >{`${currency.priceChange1d}%`}</TableCell>
                    <TableCell align="center">
                      {`$${currency.price.toFixed(2)}`}
                    </TableCell>
                    <TableCell align="center">{currency.priceBtc}</TableCell>
                    <TableCell align="center">
                      {handleTranformBigNum(currency.marketCap)}
                    </TableCell>
                    <TableCell align="center">
                      {handleTranformBigNum(currency.volume)}
                    </TableCell>
                    <TableCell align="center">GRAPH</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label={`${currency.name}-more`}
                        aria-controls={`${currency.name}-menu`}
                        aria-haspopup="true"
                        onClick={(event) =>
                          handleClickTableMenu(currency, event)
                        }
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
                            console.log(currency);
                            handleCloseTableMenu(currency);
                            addToCompare(currency);
                          }}
                        >
                          Add to Compare
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            console.log(currency);
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={currencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => handleChangePage(event, newPage)}
        onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
      />
    </React.Fragment>
  );
};

export default CurrencyTable;
