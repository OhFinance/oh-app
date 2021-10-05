import {
  Avatar,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Flex, useModal } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { EarnCompositionGroup } from "./EarnCompositionGroup";
import { FaEllipsisV, FaMinus, FaPlus } from "react-icons/fa";
import { EarnDetailsModal } from "./EarnDetailsModal";
import { EarnActionModal } from "./EarnActionModal";
import { EarnDepositModal } from "./EarnDepositModal";
import { EarnWithdrawModal } from "./EarnWithdrawModal";

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
  const [onPresentDetailsModal] = useModal(<EarnDetailsModal bank={bank} />);
  const [onPresentDepositModal] = useModal(<EarnDepositModal bank={bank} />);
  const [onPresentWithdrawModal] = useModal(<EarnWithdrawModal bank={bank} />);

  return (
    <TableRow {...props}>
      <TableCell className={isLast && classes.cell}>{bank.name}</TableCell>

      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <Avatar src={bank.image} />
        </Flex>
      </TableCell>
      {/* <TableCell className={isLast && classes.cell}>
        {bank.description}
      </TableCell> */}
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <Avatar src={bank.underlyingImage} />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <EarnCompositionGroup composition={bank.compositionImages} />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <b>18%</b>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <b>0.000</b>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <b>$0.000</b>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton
            onClick={onPresentDepositModal}
            color="inherit"
            size="small"
            style={{ padding: "8px" }}
          >
            <FaPlus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton
            onClick={onPresentWithdrawModal}
            color="inherit"
            size="small"
            style={{ padding: "8px" }}
          >
            <FaMinus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton
            onClick={onPresentDetailsModal}
            color="inherit"
            size="small"
            style={{ padding: "8px" }}
          >
            <FaEllipsisV />
          </IconButton>
        </Flex>
      </TableCell>
    </TableRow>
  );
};
