import { Box, Grid } from "@material-ui/core";
import { Button, Flex, Heading, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Bank } from "config/constants/types";
import { ApprovalState } from "hooks/useTokenApprove";
import { FC } from "react";
import { BackButton } from "components/BackButton/BackButton";
import { Skeleton } from "@material-ui/lab";

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
  onDismiss: () => void;
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
  onDismiss,
}) => {
  return (
    <Grid container direction="column" spacing={2}>
      {/* Back Button */}
      <Grid item>
        <BackButton onClick={onBack} />
      </Grid>

      <Grid item>
        <Box mb={1}>
          {receiveAmount !== undefined ? (
            <Flex align="center">
              <Heading gutterBottom={false}>
                <b>
                  <Balance value={receiveAmount} />
                </b>
              </Heading>
              <Flex ml={1} center>
                <img src={bank.image} alt={bank.alt} height={40} width="auto" />
              </Flex>
            </Flex>
          ) : (
            <Skeleton width={240} height={60} />
          )}
        </Box>

        <Heading>{bank.symbol} Bank Tokens</Heading>
      </Grid>

      <Grid item>
        <Flex align="center" justify="space-between">
          <Text>Deposit</Text>

          {depositAmount !== undefined ? (
            <Text>
              <Balance value={depositAmount} /> {bank.underlying.symbol}
            </Text>
          ) : (
            <Skeleton width={80} height={30} />
          )}
        </Flex>
        <Flex align="center" justify="space-between">
          <Text>Receive</Text>

          {receiveAmount !== undefined ? (
            <Text>
              <Balance value={receiveAmount} /> {bank.symbol}
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
        <Flex align="center" justify="space-between">
          <Text>Share of Bank</Text>

          {totalShare !== undefined ? (
            <Text>
              <Balance value={totalShare} decimals={2} suffix="%" />
            </Text>
          ) : (
            <Skeleton width={80} height={30} />
          )}
        </Flex>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={onDismiss}>
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6}>
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
      </Grid>
    </Grid>
  );
};
