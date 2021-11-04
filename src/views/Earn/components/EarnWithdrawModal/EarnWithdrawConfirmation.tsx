import { Grid } from "@material-ui/core";
import { Button, Flex, Heading, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { BackButton } from "components/BackButton/BackButton";
import { Skeleton } from "@material-ui/lab";

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
          {receiveAmount !== undefined ? (
            <Heading gutterBottom={false}>
              <b>
                <Balance value={receiveAmount} />
              </b>
            </Heading>
          ) : (
            <Skeleton width={120} height={60} />
          )}

          <Flex ml={1} center>
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

          {withdrawAmount !== undefined ? (
            <Text>
              <Balance value={withdrawAmount} /> {bank.symbol}
            </Text>
          ) : (
            <Skeleton width={80} height={30} />
          )}
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Withdraw</Text>

          {receiveAmount !== undefined ? (
            <Text>
              <Balance value={receiveAmount} /> {bank.underlying.symbol}
            </Text>
          ) : (
            <Skeleton width={80} height={30} />
          )}
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Bank Token Rate</Text>

          {exchangeRate !== undefined ? (
            <Text>
              1 {bank.symbol} ={" "}
              <Balance
                value={exchangeRate}
                decimals={bank.underlying.decimals}
              />{" "}
              {bank.underlying.symbol}
            </Text>
          ) : (
            <Skeleton width={80} height={30} />
          )}
        </Flex>
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
