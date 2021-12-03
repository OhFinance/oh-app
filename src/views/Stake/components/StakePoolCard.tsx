import { Box, Grid } from "@material-ui/core"
import { Button, Flex, Surface, Text, useMobile } from "@ohfinance/oh-ui"
import { Pool } from "config/constants/types"

export const StakePoolCard = ({ pool }: { pool: Pool }) => {
  const mobile = useMobile()

  return (
    <Surface>
      <Grid container spacing={1} alignItems="center" justify="space-between">
        <Grid item xs={12} md={4}>
          <Flex align="center">
            <Flex center mr={1}>
              <img src={pool.staked.image} alt={pool.staked.symbol} height="30px" />
            </Flex>
            <Text><b>{pool.name}</b></Text>
          </Flex>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container>
            <Grid item xs={6} md={12}>
              <Text align={mobile ? "right" : "center"}>TVL</Text>
            </Grid>
            <Grid item xs={6} md={12}>
              <Text align={mobile ? "right" : "center"}><b>$100,000,000</b></Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container>
            <Grid item xs={6} md={12}>
              <Text align={mobile ? "right" : "center"}>APR</Text>
            </Grid>
            <Grid item xs={6} md={12}>
              <Text align={mobile ? "right" : "center"}><b>100%</b></Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Flex align="center">
            <Box mr={1}>
              <Button variant="contained" color="default">Details</Button>
            </Box>
            <Button variant="contained" color="primary">Stake</Button>
          </Flex>
        </Grid>
      </Grid>
    </Surface>
  )
}
