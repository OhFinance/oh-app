import {
  Flex,
  Heading,
  IconButton,
  Subheading,
  Subtitle,
  Surface,
  Text,
  useModal,
} from "@ohfinance/oh-ui";
import { Box, Button, Grid } from "@material-ui/core";
import { FC, useMemo } from "react";
import { Bank } from "config/constants/types";
import { EarnStrategyGroup } from "../EarnStrategyGroup";
import { getFullDisplayBalance } from "utils/formatBalances";
import { EarnDetailModal } from "../EarnDetailModal";
import { EarnDepositModal } from "../EarnDepositModal";
import { EarnWithdrawModal } from "../EarnWithdrawModal";
import { useAddress } from "hooks/useAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { Balance } from "components/Balance";
import { FaEllipsisV } from "react-icons/fa";
import { useBankValue } from "views/Earn/hooks/useBankValue";
import { Skeleton } from "@material-ui/lab";

export interface EarnCardProps {
  bank: Bank;
}

export const EarnCard: FC<EarnCardProps> = ({ bank }) => {
  const [onPresentDetailModal] = useModal(<EarnDetailModal bank={bank} />);
  const [onPresentDepositModal] = useModal(<EarnDepositModal bank={bank} />);
  const [onPresentWithdrawModal] = useModal(<EarnWithdrawModal bank={bank} />);

  const address = useAddress(bank.address);
  const { balance } = useTokenBalance(address);
  const { virtualBalance, getShareValue } = useBankValue(address);

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
    <Surface>
      <Flex justify="flex-end">
        <IconButton size="medium" onClick={onPresentDetailModal}>
          <FaEllipsisV />
        </IconButton>
      </Flex>
      <Flex center mb={2}>
        <img src={bank.image} alt={bank.alt} height={96} width="auto" />
      </Flex>
      <Heading align="center">
        <b>{bank.name}</b>
      </Heading>

      <Flex align="center" justify="space-between" mt={4} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <img
                src={bank.underlying.image}
                alt={bank.underlying.symbol}
                height={40}
                width="auto"
              />
              <Box mt={1}>
                <Text align="center">Underlying</Text>
              </Box>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <EarnStrategyGroup bank={bank} />
              <Box mt={1}>
                <Text align="center">Strategies</Text>
              </Box>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex column center>
              {tvl !== undefined ? (
                <Subheading>
                  <Balance value={tvl} decimals={2} prefix="$" />
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}

              <Text align="center">TVL</Text>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex column center>
              {myHoldings !== undefined ? (
                <Subheading>
                  <Balance value={myHoldings} decimals={2} prefix="$" />
                </Subheading>
              ) : (
                <Skeleton width={80} height={40} />
              )}

              <Text align="center">My Holdings</Text>
            </Flex>
          </Grid>
        </Grid>
      </Flex>

      {/* <Paragraph align="center">18% APY</Paragraph> */}

      <Flex align="center" justify="space-around">
        <Button color="primary" size="large" onClick={onPresentDepositModal}>
          Deposit
        </Button>
        <Button color="primary" size="large" onClick={onPresentWithdrawModal}>
          Withdraw
        </Button>
      </Flex>
    </Surface>
  );
};
