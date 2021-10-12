import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Flex, Text, useModal } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { EarnCompositionGroup } from "../EarnCompositionGroup";
import { FaEllipsisV, FaMinus, FaPlus } from "react-icons/fa";
import { EarnDetailModal } from "../EarnDetailModal";
import { EarnDepositModal } from "../EarnDepositModal";
import { EarnWithdrawModal } from "../EarnWithdrawModal";
import { useTokenBalance } from "hooks/useTokenBalance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "components/Balance";
import { useAddress } from "hooks/useAddress";
import { useBankValue } from "views/Earn/hooks/useBankValue";
import BigNumber from "bignumber.js";
import { TEN } from "utils/bigNumber";

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
  const [onPresentDetailModal] = useModal(<EarnDetailModal bank={bank} />);
  const [onPresentDepositModal] = useModal(<EarnDepositModal bank={bank} />);
  const [onPresentWithdrawModal] = useModal(<EarnWithdrawModal bank={bank} />);

  const address = useAddress(bank.address);
  const { balance } = useTokenBalance(address);
  const { virtualBalance, getShareValue } = useBankValue(address);

  return (
    <TableRow {...props}>
      <TableCell className={isLast && classes.cell}>
        <Text>{bank.name}</Text>
      </TableCell>

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
        <Text align="center">
          <Balance
            value={getFullDisplayBalance(virtualBalance, bank.decimals, 2)}
            prefix="$"
          />
        </Text>
      </TableCell>
      {/* <TableCell className={isLast && classes.cell}>
        <Text align="center">
          <Balance value={getFullDisplayBalance(balance, bank.decimals)} />
        </Text>
      </TableCell> */}
      <TableCell className={isLast && classes.cell}>
        <Text align="center">
          <Balance
            value={getFullDisplayBalance(
              getShareValue(balance, bank.decimals),
              6
            )}
            decimals={2}
            prefix="$"
          />
        </Text>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {/* <Button color="primary">Deposit</Button> */}
          <IconButton onClick={onPresentDepositModal} size="medium">
            <FaPlus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {/* <Button color="primary">Withdraw</Button> */}
          <IconButton onClick={onPresentWithdrawModal} size="medium">
            <FaMinus />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton onClick={onPresentDetailModal} size="medium">
            <FaEllipsisV />
          </IconButton>
        </Flex>
      </TableCell>
    </TableRow>
  );
};
