import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import BigNumber from "bignumber.js";

import { TableSurface } from "components/TableSurface";
import { Tooltip } from "components/Tooltip";
import { Pool } from "config/constants/pools";
import { useCallback, useState } from "react";
import { TVLStateUpdater } from "views/Stake/Stake";
import { StakePoolTableRow } from "./StakePoolTableRow";

export const StakePoolTable = ({
  pools,
  updateState,
}: {
  pools: Pool[];
  updateState: TVLStateUpdater;
}) => {
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
              <TableCell align="right">Claimable Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool, i) => (
              <StakePoolTableRow
                key={`staking-pool-${pool.poolAddress}-${i}`}
                pool={pool}
                updateState={updateState}
                bottomBorder={i !== pools.length - 1}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableSurface>
  );
};
