import { Box, Divider, Grid } from "@material-ui/core";
import {
  Button,
  Flex,
  Heading,
  Subheading,
  Subtitle,
  Surface,
  Text,
} from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Timelock } from "config/constants/timelocks";
import { useAddress } from "hooks/useAddress";
import { FC } from "react";
import { useClaimData } from "../hooks/useClaimData";

export interface ClaimSurfaceProps {
  timelock: Timelock;
}

export const ClaimSurface: FC<ClaimSurfaceProps> = ({ timelock }) => {
  const address = useAddress(timelock.address);
  const { totalClaimBalance, claimedBalance, claimableBalance } =
    useClaimData(address);

  if (!totalClaimBalance || totalClaimBalance.eq(0)) {
    return null;
  }

  return (
    <Surface>
      <Flex align="center">
        <Box mr={1}>
          <Heading>{timelock.name}</Heading>
        </Box>
        <Subtitle paragraph={false} color="textSecondary">
          {timelock.cliff} Day Cliff, {timelock.lockPeriod / 30} Month Linear
          Unlock
        </Subtitle>
      </Flex>
      <Divider />
      <Box mt={2}>
        {totalClaimBalance.lte(0) ? (
          <Subheading align="center" gutterBottom={false}>
            No Tokens To Claim
          </Subheading>
        ) : (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item>
              <Flex column center>
                <Subheading>
                  <Balance value={totalClaimBalance.toString()} />
                </Subheading>
                <Text color="textSecondary">Total Tokens</Text>
              </Flex>
            </Grid>
            <Grid item>
              <Flex column center>
                <Subheading>
                  <Balance
                    value={totalClaimBalance
                      .minus(claimedBalance)
                      .minus(claimableBalance)
                      .toString()}
                  />
                </Subheading>
                <Text color="textSecondary">Locked</Text>
              </Flex>
            </Grid>
            <Grid item>
              <Flex column center>
                <Subheading>
                  <Balance value={claimedBalance.toString()} />
                </Subheading>
                <Text color="textSecondary">Unlocked</Text>
              </Flex>
            </Grid>
            <Grid item>
              <Flex column center>
                <Subheading>
                  <Balance value={claimableBalance.toString()} />
                </Subheading>
                <Text color="textSecondary">Unclaimed</Text>
              </Flex>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="large" paper>
                Claim
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Surface>
  );
};
