import { Grid } from "@material-ui/core";
import { Button, Flex, Heading, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Bank } from "config/constants/types";
import { ApprovalState } from "hooks/useTokenApprove";
import { FC } from "react";
import { BackButton } from "components/BackButton/BackButton";

export interface EarnDepositConfirmationProps {
  bank: Bank;
  input: string;
  approvalState: ApprovalState;
  depositAmount: string;
  receiveAmount: string;
  exchangeRate: string;
  totalShare: string;
  onApprove: () => void;
  onBack: () => void;
  onDeposit: () => void;
}

export const EarnDepositConfirmation: FC<EarnDepositConfirmationProps> = ({
  bank,
  input,
  approvalState,
  depositAmount,
  receiveAmount,
  exchangeRate,
  totalShare,
  onApprove,
  onBack,
  onDeposit,
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
            <img src={bank.image} alt={bank.alt} height={40} width="auto" />
          </Flex>
        </Flex>
      </Grid>

      <Grid item>
        <Heading>{bank.symbol} Bank Tokens</Heading>
        {/* <Text color="textSecondary">Outputs are estimated</Text> */}
      </Grid>

      <Grid item>
        <Flex align="center" justify="space-between">
          <Text>Deposit</Text>
          <Text>
            <Balance value={depositAmount} /> {bank.underlying.symbol}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Receive</Text>
          <Text>
            <Balance value={receiveAmount} /> {bank.symbol}
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
        <Flex align="center" justify="space-between">
          <Text>Share of Bank</Text>
          <Text>
            <Balance value={totalShare} decimals={2} suffix="%" />
          </Text>
        </Flex>
      </Grid>

      <Grid item>
        {(approvalState === ApprovalState.NOT_APPROVED ||
          approvalState === ApprovalState.PENDING) && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={approvalState === ApprovalState.PENDING}
            onClick={onApprove}
          >
            {approvalState === ApprovalState.PENDING
              ? `Approving ${bank.underlying.symbol}`
              : `Approve ${bank.underlying.symbol}`}
          </Button>
        )}
        {(approvalState === ApprovalState.APPROVED ||
          approvalState === ApprovalState.UNKNOWN) && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!input || approvalState === ApprovalState.UNKNOWN}
            onClick={onDeposit}
          >
            Deposit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
