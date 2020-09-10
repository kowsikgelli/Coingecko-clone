import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CoinGecko from "coingecko-api";
const CoinGeckoClinet = new CoinGecko();
function CoinDetails() {
  const [coinDetails, setCoinDetails] = useState([]);
  useEffect(() => {
    async function loadCoinDetails() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await CoinGeckoClinet.coins.markets({ params });
      setCoinDetails(result.data);
    }
    loadCoinDetails();
  }, []);
  console.log("coinDetails", coinDetails);
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const formatPercentage = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell>24H Change</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Market Cap</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinDetails.map((coin) => (
              <StyledTableRow key={coin.id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  {coin.symbol.toUpperCase()}
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    style={
                      coin.price_change_percentage_24h > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  {formatDollar(coin.current_price, 20)}
                </StyledTableCell>
                <StyledTableCell>
                  {formatDollar(coin.market_cap, 12)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default CoinDetails;
