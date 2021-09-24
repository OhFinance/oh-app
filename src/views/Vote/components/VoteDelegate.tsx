import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Flex, Paragraph, Subheader } from "@ohfinance/oh-ui";

export const VoteDelegate = () => {
  return (
    <Box>
      <Paragraph>
        Delegation allows you to participate in Governance or delegate your
        votes to another trusted user."{" "}
      </Paragraph>
      <Flex center>
        <Grid container spacing={1}>
          <Grid item>
            <TextField variant="outlined" placeholder="Delegate" size="small" />
          </Grid>
          <Grid item>
            <Button variant="contained" size="medium" color="primary">
              Delegate
            </Button>
          </Grid>
        </Grid>
        <Flex center>
          <Paragraph>My Current Delegation</Paragraph>
          <Paragraph>0x0000000000000000000000000000000000000000</Paragraph>
        </Flex>
      </Flex>
    </Box>
  );
};
