import React, { useContext } from "react";
import CompareCurrenciesContext from "./../context/compareCurrenciesContext";
import RemoveFromCompareContext from "./../context/removeFromCompare";

import Button from "@material-ui/core/Button";

const CompareList = () => {
  const currenciesToCompare = useContext(CompareCurrenciesContext);
  const removeFromCompareList = useContext(RemoveFromCompareContext);

  return (
    <React.Fragment>
      {currenciesToCompare.map((currency) => (
        <Button
          key={currency.symbol}
          variant="outlined"
          color="secondary"
          onClick={() => removeFromCompareList(currency)}
        >
          <div>
            <img
              src={currency.icon}
              alt={`${currency.name} icon`}
              width="25"
              height="25"
            ></img>
          </div>
          {currency.name}-{currency.symbol}
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      ))}
    </React.Fragment>
  );
};

export default CompareList;
