import {
  Avatar,
  Box,
  Button,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Flex, Text, useModal } from "@ohfinance/oh-ui";
import { Bank } from "config/constants/types";
import { FC, useMemo } from "react";
import { EarnStrategyGroup } from "../EarnStrategyGroup";
import { EarnDetailModal } from "../EarnDetailModal";
import { EarnDepositModal } from "../EarnDepositModal";
import { EarnWithdrawModal } from "../EarnWithdrawModal";
import { useTokenBalance } from "hooks/useTokenBalance";
import { getFullDisplayBalance } from "utils/formatBalances";
import { Balance } from "components/Balance";
import { useAddress } from "hooks/useAddress";
import { useBankValue } from "views/Earn/hooks/useBankValue";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import { NetworkIcons, Networks } from "config/constants/networks";
import { Skeleton } from "@material-ui/lab";
import useAPY from "hooks/useAPY";

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
  const apys = useAPY();

  const apy = useMemo(() => {
    return (
      apys &&
      apys[bank.chainId] &&
      apys[bank.chainId][bank.address[bank.chainId]] &&
      apys[bank.chainId][bank.address[bank.chainId]].length &&
      apys[bank.chainId][bank.address[bank.chainId]][0].apy // 24h apy
    );
  }, [bank, apys]);

  const tvl = useMemo(() => {
    return (
      virtualBalance && getFullDisplayBalance(virtualBalance, bank.decimals)
    );
  }, [virtualBalance, bank]);

  const shareValue = useMemo(() => {
    return balance && getShareValue(balance, bank.decimals);
  }, [balance, bank, getShareValue]);

  const myHoldings = useMemo(() => {
    return shareValue && getFullDisplayBalance(shareValue, bank.decimals);
  }, [shareValue, bank]);

  return (
    <TableRow {...props}>
      {/* <TableCell className={isLast && classes.cell}>
        <Text>{bank.name}</Text>
      </TableCell> */}

      <TableCell className={isLast && classes.cell}>
        <Flex align="center">
          <img src={bank.image} alt={bank.alt} height={40} width="auto" />
          <Box ml={1}>
            <Text>{bank.symbol}</Text>
          </Box>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <img
            src={NetworkIcons[bank.chainId]}
            alt={Networks[bank.chainId].chainName}
            height={40}
            width="auto"
          />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <img
            src={bank.underlying.image}
            alt={bank.underlying.symbol}
            height={40}
            width="auto"
          />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <EarnStrategyGroup bank={bank} />
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {apy !== undefined ? (
            <Balance value={apy} decimals={2} suffix="%" />
          ) : (
            <Skeleton width={80} height={40} />
          )}
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {tvl !== undefined ? (
            <Balance value={tvl} decimals={2} prefix="$" />
          ) : (
            <Skeleton width={80} height={40} />
          )}
        </Flex>
      </TableCell>
      {/* <TableCell className={isLast && classes.cell}>
        <Text align="center">
          <Balance value={getFullDisplayBalance(balance, bank.decimals)} />
        </Text>
      </TableCell> */}
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {myHoldings !== undefined ? (
            <Balance value={myHoldings} decimals={2} prefix="$" />
          ) : (
            <Skeleton width={80} height={40} />
          )}
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {/* <Button color="primary">Deposit</Button> */}
          <IconButton onClick={onPresentDepositModal} size="medium">
            <AddRoundedIcon />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          {/* <Button color="primary">Withdraw</Button> */}
          <IconButton onClick={onPresentWithdrawModal} size="medium">
            <RemoveRoundedIcon />
          </IconButton>
        </Flex>
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        <Flex center>
          <IconButton onClick={onPresentDetailModal} size="medium">
            <MoreVertRoundedIcon />
          </IconButton>
        </Flex>
      </TableCell>
    </TableRow>
  );
};
