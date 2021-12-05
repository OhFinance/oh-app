import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/types";
import { FC } from "react";
import { StakeClaimModal } from "../StakeClaimModal";

export interface StakeClaimTableRowProps {
  pool: Pool;
}

export const StakeClaimTableRow: FC<StakeClaimTableRowProps> = ({ pool }) => {
  const [handlePresentClaimModal] = useModal(<StakeClaimModal pool={pool} />);

  return (
    <TableRow
      hover
      onClick={handlePresentClaimModal}
      style={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Flex center m={1}>
          <img src={pool.staked.image} alt={pool.staked.symbol} height={30} />
        </Flex>
      </TableCell>
      <TableCell>
        <b>{pool.name}</b>
      </TableCell>
      <TableCell align="right">
        <b>
          <Balance value={100} />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>
          <Balance value={11.84} decimals={2} prefix="$" />
        </b>
      </TableCell>
      <TableCell align="right">
        <b>Locked</b>
      </TableCell>
      <TableCell align="right">
        <b>3/1/2022</b>
      </TableCell>
    </TableRow>
  );
};
