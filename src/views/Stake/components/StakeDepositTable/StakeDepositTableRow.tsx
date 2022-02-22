import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/pools";
import { FC, useEffect, useMemo } from "react";
import { StakeDepositModal } from "../StakeDepositModal";
import { DepositsState } from "hooks/useDeposits";
import { unixToDate } from "utils/misc";
import { getFullDisplayBalance } from "utils/formatBalances";
import useStakingStyles from "../styles";
import { TVLStateUpdater } from "views/Stake/Stake";
import { TEN } from "utils/bigNumber";
import useCoingeckoUsdPrice from "hooks/useCoingeckoPrice";
import { useWeb3 } from "hooks/useWeb3";
export interface StakeDepositRowProps {
  pool: Pool;
  deposit: DepositsState["deposits"][0];
  updateState: TVLStateUpdater;
  depositId: number;
}

export const StakeDepositTableRow: FC<StakeDepositRowProps> = ({
  pool,
  deposit,
  updateState,
  depositId,
}) => {
  const { chainId } = useWeb3();
  const [handlePresentDepositModal] = useModal(
    <StakeDepositModal pool={pool} depositId={depositId} deposit={deposit} />
  );
  const classes = useStakingStyles();
  const usdPrice = useCoingeckoUsdPrice(pool.token.address[chainId]);

  useEffect(() => {
    updateState("byPoolUserStake", pool, {
      value: deposit.amount.dividedBy(TEN.pow(pool.token.decimals)),
      usdPrice: usdPrice.result,
    });
  }, [updateState, pool, deposit.amount]);

  const canWithdraw = useMemo(
    () => Math.floor(Date.now()) > deposit.end.toNumber(),
    [deposit.end]
  );
  return (
    <TableRow
      hover
      className={classes.row}
      onClick={canWithdraw ? handlePresentDepositModal : undefined}
      style={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Flex center m={1}>
          <img src={pool.token.image} alt={pool.token.symbol} height={30} />
        </Flex>
      </TableCell>
      <TableCell>
        <b>{pool.label}</b>
      </TableCell>
      <TableCell align="right">
        <b>
          <Balance
            value={getFullDisplayBalance(deposit.amount, pool.token.decimals)}
            decimals={2}
            suffix={" " + pool.token.symbol}
          />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>{unixToDate(deposit.start.toNumber())}</b>
      </TableCell>
      <TableCell align="right">
        <b>{unixToDate(deposit.end.toNumber())}</b>
      </TableCell>
    </TableRow>
  );
};
