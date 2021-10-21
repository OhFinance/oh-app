import { Button, Flex, Subheading, Subtitle, Text } from "@ohfinance/oh-ui";
import { Spinner } from "components/Spinner";
import { FC } from "react";
import { Grid } from "@material-ui/core";
import { BackButton } from "components/BackButton/BackButton";

export interface TransactionPendingContentProps {
  pendingText: string;
  onBack: () => void;
}

export const TransactionPendingContent: FC<TransactionPendingContentProps> = ({
  pendingText,
  onBack,
}) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <BackButton onClick={onBack} />
      </Grid>
      <Grid item>
        <Flex m={4} center>
          <Spinner size={80} />
        </Flex>
      </Grid>
      <Grid item>
        <Subheading align="center">
          <b>{pendingText}</b>
        </Subheading>
        <Text align="center" color="textSecondary">
          Confirm this transaction in your Wallet
        </Text>
      </Grid>
    </Grid>
  );
};
