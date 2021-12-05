import { TableCell, TableRow } from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Pool } from "config/constants/types";
import { StakePoolModal } from "../StakePoolModal";

export const StakePoolTableRow = ({
  pool,
  bottomBorder = true,
}: {
  pool: Pool;
  bottomBorder?: boolean;
}) => {
  const [onPresentStakeModal] = useModal(<StakePoolModal pool={pool} />);

  return (
    <TableRow
      hover
      onClick={onPresentStakeModal}
      style={{
        cursor: "pointer",
      }}
    >
      <TableCell
        padding="checkbox"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <Flex center m={1}>
          <img src={pool.staked.image} alt={pool.staked.symbol} height={30} />
        </Flex>
      </TableCell>
      <TableCell style={{ borderBottom: !bottomBorder && "none" }}>
        <b>{pool.name}</b>
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          <Balance value={30} decimals={2} suffix="%" />
        </b>
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          <Balance value={1000} decimals={2} prefix="$" />
        </b>
      </TableCell>
      <TableCell
        align="right"
        style={{ borderBottom: !bottomBorder && "none" }}
      >
        <b>
          <Balance value={0} />
        </b>
      </TableCell>
    </TableRow>
  );
};
