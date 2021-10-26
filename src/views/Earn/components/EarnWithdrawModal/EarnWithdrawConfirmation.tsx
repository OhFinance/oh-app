import { Grid } from "@material-ui/core";
import { Button, Flex, Heading, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { BackButton } from "components/BackButton/BackButton";

export interface EarnWithdrawConfirmationProps {
  bank: Bank;
  input: string;
  withdrawAmount: string;
  receiveAmount: string;
  exchangeRate: string;
  // totalShare: string;
  onBack: () => void;
  onWithdraw: () => void;
}

export const EarnWithdrawConfirmation: FC<EarnWithdrawConfirmationProps> = ({
  bank,
  input,
  withdrawAmount,
  receiveAmount,
  exchangeRate,
  // totalShare,
  onBack,
  onWithdraw,
}) => {
  return (
    <Grid container direction="column" spacing={2}>
      {/* Back Button */}
      <Grid item>
        <BackButton onClick={onBack} />
      </Grid>

      <Grid item>
        <Flex align="center">
          <Heading>
            <b>
              <Balance value={receiveAmount} />
            </b>
          </Heading>
          <Flex ml={1}>
            <img
              src={bank.underlying.image}
              alt={bank.alt}
              height={40}
              width="auto"
            />
          </Flex>
        </Flex>
      </Grid>

      <Grid item>
        <Heading>{bank.underlying.symbol} Tokens</Heading>
        {/* <Text color="textSecondary">Outputs are estimated</Text> */}
      </Grid>

      <Grid item>
        <Flex align="center" justify="space-between">
          <Text>Return</Text>
          <Text>
            <Balance value={withdrawAmount} /> {bank.symbol}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Withdraw</Text>
          <Text>
            <Balance value={receiveAmount} /> {bank.underlying.symbol}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Bank Token Rate</Text>
          <Text>
            1 {bank.symbol} ={" "}
            <Balance value={exchangeRate} decimals={bank.underlying.decimals} />{" "}
            {bank.underlying.symbol}
          </Text>
        </Flex>
        {/* <Flex align="center" justify="space-between">
          <Text>Share of Bank</Text>
          <Text>
            <Balance value={totalShare} />%
          </Text>
        </Flex> */}
      </Grid>

      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={!input}
          onClick={onWithdraw}
        >
          Withdraw
        </Button>
      </Grid>
    </Grid>
  );
};
