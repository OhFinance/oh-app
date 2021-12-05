import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TableSurface } from "components/TableSurface";
import OhToken from "assets/img/oh-token.svg";
import { StakeDepositTableRow } from "./StakeDepositTableRow";
import { pools } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";

export const StakeDepositTable = () => {
  const { chainId } = useWeb3();

  return (
    <TableSurface>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Deposit</TableCell>
              <TableCell align="right">Amount Staked</TableCell>
              <TableCell align="right">Lock Date</TableCell>
              <TableCell align="right">Unlock Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(1)].map(() => (
              <StakeDepositTableRow pool={pools[chainId][0]} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
