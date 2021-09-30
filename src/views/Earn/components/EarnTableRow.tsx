import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { AvatarGroup } from "@material-ui/lab";
import { EarnCompositionGroup } from "./EarnCompositionGroup";
import { FaEllipsisV, FaMinus, FaPlus, FaPlusCircle } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: "none",
  },
}));

export interface EarnTableRowProps {
  bank: Bank;
  isLast?: boolean;
}

export const EarnTableRow: FC<EarnTableRowProps> = ({
  bank,
  isLast,
  ...props
}) => {
  const classes = useStyles();

  return (
    <TableRow {...props}>
      <TableCell className={isLast && classes.cell}>
        <Avatar src={bank.image} />
      </TableCell>
      <TableCell className={isLast && classes.cell}>{bank.symbol}</TableCell>
      <TableCell className={isLast && classes.cell}>
        {bank.description}
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <Avatar src={bank.underlying} />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <EarnCompositionGroup composition={bank.composition} />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <b>18%</b>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton color="inherit" size="small" style={{ padding: "8px" }}>
            <FaPlus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton color="inherit" size="small" style={{ padding: "8px" }}>
            <FaMinus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton color="inherit" size="small" style={{ padding: "8px" }}>
            <FaEllipsisV />
          </IconButton>
        </Flex>
      </TableCell>
    </TableRow>
  );
};
