import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableSurface } from "components/TableSurface";
import OhToken from "assets/img/oh-token.svg";
import { Flex } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { StakeClaimTableRow } from "./StakeClaimTableRow";
import { pools } from "config/constants/pools";
import { useWeb3 } from "hooks/useWeb3";

export const StakeClaimTable = () => {
  const { chainId } = useWeb3();

  return (
    <TableSurface>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Claim</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">USD Value</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Unlock Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StakeClaimTableRow pool={pools[chainId][0]} />
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
