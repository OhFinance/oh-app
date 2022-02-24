import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableSurface } from "components/TableSurface";
import { StakeClaimTableRow } from "./StakeClaimTableRow";
import { POOLS, Pool } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";
import { useDeposits } from "hooks/useDeposits";
import { useLocks } from "hooks/useLocks";

const RowsContainer = ({ pool }: { pool: Pool }) => {
  const deposits = useDeposits(pool.escrowAddress);
  const locks = useLocks(pool.escrowAddress);
  if (locks === null) {
    return null;
  }
  return (
    <>
      {locks.map((lock, i) => (
        <StakeClaimTableRow
          key={`${i}-${lock.end}-${lock.amount.toNumber()}`}
          pool={pool}
          lock={lock}
          depositId={i}
        />
      ))}
    </>
  );
};

export const StakeClaimTable = () => {
  const { chainId } = useWeb3();

  return (
    <TableSurface>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Pool</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">USD Value</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Unlock Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {POOLS[chainId].map((pool, i) => (
              <RowsContainer
                pool={pool}
                key={`${i}-${pool.poolAddress}-claimrows`}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
