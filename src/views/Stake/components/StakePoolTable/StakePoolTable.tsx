import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { TableSurface } from "components/TableSurface";
import { Tooltip } from "components/Tooltip";
import { Pool } from "config/constants/types";
import { StakePoolTableRow } from "./StakePoolTableRow";

export const StakePoolTable = ({ pools }: { pools: Pool[] }) => {
  return (
    <TableSurface>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Pool</TableCell>
              <TableCell align="right">
                <Flex align="center" justifyContent="flex-end">
                  <Box mr={1}>APR</Box>
                  <Tooltip size={12} title="asdf" />
                </Flex>
              </TableCell>
              <TableCell align="right">
                <Flex align="center" justifyContent="flex-end">
                  <Box mr={1}>TVL</Box>
                  <Tooltip size={12} title="asdf" />
                </Flex>
              </TableCell>
              <TableCell align="right">Wallet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool, i) => (
              <StakePoolTableRow
                pool={pool}
                bottomBorder={i !== pools.length - 1}
                key={i}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
