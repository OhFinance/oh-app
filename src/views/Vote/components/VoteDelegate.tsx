import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";

export const VoteDelegate = () => {
  return (
    <Box>
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
      </Flex>
    </Box>
  );
};
