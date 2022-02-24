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
import BigNumber from "bignumber.js";

export interface StakeClaimTableRowProps {
  pool: Pool;
  lock: { amount: BigNumber; end: number };
  depositId: number;
}

export const StakeClaimTableRow: FC<StakeClaimTableRowProps> = ({
  pool,
  lock,
  depositId,
}) => {
  const [handlePresentClaimModal] = useModal(
    <StakeClaimModal pool={pool} deposit={lock} depositId={depositId} />
  );
  const { chainId } = useWeb3();
  const usdPrice = useCoingeckoUsdPrice(pool.rewardToken.address[chainId]);
  const classes = useStakingStyles();
  const status = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    if (now < lock.end) {
      return "Locked";
    } else {
      return "Unlocked";
    }
  }, [lock]);
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
            value={getFullDisplayBalance(lock.amount)}
            suffix={" " + pool.rewardToken.symbol}
          />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>
          {!usdPrice.loading && !usdPrice.error ? (
            <Balance
              value={getFullDisplayBalance(
                lock.amount.multipliedBy(usdPrice.result)
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
        <b>{unixToDate(lock.end)}</b>
      </TableCell>
    </TableRow>
  );
};
