import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/types";
import { FC } from "react";
import { StakeDepositModal } from "../StakeDepositModal";

export interface StakeDepositRowProps {
  pool: Pool;
}

export const StakeDepositTableRow: FC<StakeDepositRowProps> = ({ pool }) => {
  const [handlePresentDepositModal] = useModal(
    <StakeDepositModal pool={pool} />
  );

  return (
    <TableRow
      hover
      onClick={handlePresentDepositModal}
      style={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Flex center m={1}>
          <img src={pool.staked.image} alt={pool.staked.symbol} height={30} />
        </Flex>
      </TableCell>
      <TableCell>
        <b>Oh! Finance</b>
      </TableCell>
      <TableCell align="right">
        <b>
          <Balance value={1200} decimals={2} prefix="$" />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>12/1/2021</b>
      </TableCell>
      <TableCell align="right">
        <b>12/31/2021</b>
      </TableCell>
    </TableRow>
  );
};
