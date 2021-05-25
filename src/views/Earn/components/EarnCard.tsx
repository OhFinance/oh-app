import { Surface } from "components/Surface";
import OhLogo from "assets/img/oh-logo.png";
import { Flex } from "@ohfinance/oh-ui";
import { Box, Button, Typography } from "@material-ui/core";

export const EarnCard = () => {
  return (
    <Surface>
      <Flex center mb={2}>
        <img src={OhLogo} alt="oh-earn-logo" height={40} width="auto" />
      </Flex>
      <Typography variant="h6" align="center">
        Oh! USDC
      </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        Risk-Optimized
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        <b>18% APY</b>
      </Typography>
      <Flex align="center" justify="space-between" mb={2}>
        <Box>
          <Typography align="center" variant="body2">
            Underlying
          </Typography>
        </Box>
        <Box>
          <Typography align="center" variant="body2">
            Composition
          </Typography>
        </Box>
      </Flex>
      <Button variant="contained" color="primary" fullWidth>
        Deposit / Withdraw
      </Button>
    </Surface>
  );
};
