import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/pools";
import { FC, useMemo } from "react";
import { StakeClaimModal } from "../StakeClaimModal";
import { DepositsState } from "hooks/useDeposits";
import { unixToDate } from "utils/misc";
import { getFullDisplayBalance } from "utils/formatBalances";
import useStakingStyles from "../styles";
import useCoingeckoUsdPrice from "hooks/useCoingeckoPrice";
import { useWeb3 } from "hooks/useWeb3";

export interface StakeClaimTableRowProps {
  pool: Pool;
  deposit: DepositsState["deposits"][0];
  depositId: number;
}

export const StakeClaimTableRow: FC<StakeClaimTableRowProps> = ({
  pool,
  deposit,
  depositId,
}) => {
  const [handlePresentClaimModal] = useModal(
    <StakeClaimModal pool={pool} deposit={deposit} depositId={depositId} />
  );
  const { chainId } = useWeb3();
  const usdPrice = useCoingeckoUsdPrice(pool.rewardToken.address[chainId]);
  const classes = useStakingStyles();
  const status = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    if (now < deposit.end.toNumber()) {
      return "Locked";
    } else {
      return "Unlocked";
    }
  }, [deposit]);
  return (
    <TableRow
      hover={status === "Unlocked"}
      className={classes.row}
      onClick={status === "Locked" ? undefined : handlePresentClaimModal}
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
            value={getFullDisplayBalance(deposit.amount)}
            suffix={" " + pool.rewardToken.symbol}
          />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>
          {!usdPrice.loading && !usdPrice.error ? (
            <Balance
              value={getFullDisplayBalance(
                deposit.amount.multipliedBy(usdPrice.result)
              )}
              decimals={2}
              prefix="$"
            />
          ) : (
            "loading..."
          )}
        </b>
      </TableCell>
      <TableCell align="right">
        <b>{status}</b>
      </TableCell>
      <TableCell align="right">
        <b>{unixToDate(deposit.end.toNumber())}</b>
      </TableCell>
    </TableRow>
  );
};
