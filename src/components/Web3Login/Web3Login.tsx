import { Box, Grid } from "@material-ui/core";
import { Button, Flex, Heading, Subtitle } from "@ohfinance/oh-ui";
import { Web3ProviderButton } from "components/Web3ProviderButton";
import connectors from "config/constants/connectors";

export const Web3Login = () => {
  return (
    <Flex center column grow={1}>
      <Box mb={2}>
        <Heading align="center">Login with your Wallet</Heading>
      </Box>
      <Grid container spacing={2}>
        {connectors.map((connector, i) => (
          <Grid item key={i} xs={12} md={6}>
            <Web3ProviderButton connector={connector} />
          </Grid>
        ))}
      </Grid>
      <Flex mt={4} column center>
        <Subtitle color="textSecondary" paragraph={false} gutterBottom>
          Don't have a crypto wallet yet?
        </Subtitle>
        <Button color="primary" href="https://docs.oh.finance/">
          Learn More
        </Button>
      </Flex>
    </Flex>
  );
};
