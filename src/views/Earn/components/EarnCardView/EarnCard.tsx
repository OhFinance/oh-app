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
import { Avatar, Button, Grid } from "@material-ui/core";
import { FC } from "react";
import { Bank } from "config/constants/types";
import { EarnCompositionGroup } from "../EarnCompositionGroup";
import { getFullDisplayBalance } from "utils/formatBalances";
import { EarnDetailModal } from "../EarnDetailModal";
import { EarnDepositModal } from "../EarnDepositModal";
import { EarnWithdrawModal } from "../EarnWithdrawModal";
import { useAddress } from "hooks/useAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { Balance } from "components/Balance";
import { FaEllipsisV } from "react-icons/fa";
import { useBankValue } from "views/Earn/hooks/useBankValue";

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

  return (
    <Surface>
      <Flex justify="flex-end">
        <IconButton size="medium" onClick={onPresentDetailModal}>
          <FaEllipsisV />
        </IconButton>
      </Flex>
      <Flex center mb={2}>
        <Avatar src={bank.image} style={{ height: "96px", width: "auto" }} />
      </Flex>
      <Heading align="center">
        <b>{bank.name}</b>
      </Heading>
      <Subtitle align="center">{bank.description}</Subtitle>

      <Flex align="center" justify="space-between" mt={4} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <Avatar src={bank.underlyingImage} />
              <Text align="center">Underlying</Text>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <EarnCompositionGroup composition={bank.compositionImages} />
              <Text align="center">Composition</Text>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex column center>
              <Subheading>
                <Balance
                  value={getFullDisplayBalance(virtualBalance, bank.decimals)}
                  decimals={2}
                  prefix="$"
                />
              </Subheading>
              <Text align="center">TVL</Text>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex column center>
              <Subheading>
                <Balance
                  value={getFullDisplayBalance(
                    getShareValue(balance, bank.decimals),
                    bank.decimals
                  )}
                  decimals={2}
                  prefix="$"
                />
              </Subheading>
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
