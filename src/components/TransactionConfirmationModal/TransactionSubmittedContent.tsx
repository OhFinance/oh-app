import { FC } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Button, Flex, Link, Subheading, Text } from "@ohfinance/oh-ui";
import { Grid } from "@material-ui/core";
import { LinkButton } from "components/LinkButton";
import { useNetwork } from "hooks/useNetwork";

export interface TransactionSubmittedContentProps {
  hash: string;
  onDismiss: () => void;
}

export const TransactionSubmittedContent: FC<TransactionSubmittedContentProps> =
  ({ hash, onDismiss }) => {
    const { blockExplorerUrl } = useNetwork();

    return (
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Flex center>
            <CheckCircleIcon
              color="primary"
              style={{ height: 200, width: 200 }}
            />
          </Flex>
        </Grid>
        <Grid item>
          <Subheading align="center" gutterBottom>
            <b>Transaction Submitted</b>
          </Subheading>
          {/* <Link external href="/">
            <Text paragraph>View on Block Explorer</Text>
          </Link> */}
          <LinkButton link={`${blockExplorerUrl}/tx/${hash}`}>
            View on Block Explorer
          </LinkButton>
        </Grid>
        <Grid item>
          <Button onClick={onDismiss} color="primary" variant="contained">
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };
