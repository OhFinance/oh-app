import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableSurface } from "components/TableSurface";
import { StakeDepositTableRow } from "./StakeDepositTableRow";
import { POOLS, Pool } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";
import { useDeposits } from "hooks/useDeposits";
import { TVLStateUpdater } from "views/Stake/Stake";

const RowsContainer = ({
  pool,
  updateState,
}: {
  pool: Pool;
  updateState: TVLStateUpdater;
}) => {
  const deposits = useDeposits(pool.poolAddress);

  return (
    <>
      {deposits.deposits.map((deposit, i) => (
        <StakeDepositTableRow
          updateState={updateState}
          key={`${i}-${deposit.end.toNumber()}-${deposit.start.toNumber()}`}
          pool={pool}
          deposit={deposit}
          depositId={i}
        />
      ))}
    </>
  );
};
export const StakeDepositTable = ({
  updateState,
}: {
  updateState: TVLStateUpdater;
}) => {
  const { chainId } = useWeb3();

  return (
    <TableSurface>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Pool</TableCell>
              <TableCell align="right">Amount Staked</TableCell>
              <TableCell align="right">Lock Date</TableCell>
              <TableCell align="right">Unlock Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {POOLS[chainId].map((pool, i) => (
              <RowsContainer
                pool={pool}
                updateState={updateState}
                key={`${i}-${pool.poolAddress}-depositsrows`}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
