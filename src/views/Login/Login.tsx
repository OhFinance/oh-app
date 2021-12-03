import { Box, Grid } from "@material-ui/core";
import { Button, DOCS_URL, Flex, Heading, Subtitle } from "@ohfinance/oh-ui";
import { Web3ProviderButton } from "components/Web3ProviderButton";
import connectors from "config/constants/connectors";

const Login = () => {
  return (
    <Flex center column grow={1}>
      <Box mb={2}>
        <Heading align="center" gutterBottom>
          Connect Wallet
        </Heading>
        <Subtitle align="center" color="textSecondary">
          Login to Oh! Finance
        </Subtitle>
      </Box>
      <Grid container spacing={2} justify="center">
        {connectors.map((connector, i) => (
          <Grid item key={i} xs={12} md={8}>
            <Web3ProviderButton connector={connector} />
          </Grid>
        ))}
      </Grid>
      <Flex mt={4} column center>
        <Subtitle color="textSecondary" gutterBottom>
          Don't have a crypto wallet yet?
        </Subtitle>
        <Button color="primary" href={DOCS_URL}>
          Learn More
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
