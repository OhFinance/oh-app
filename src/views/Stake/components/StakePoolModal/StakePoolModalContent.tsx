import { Box, ButtonGroup, Grid, Slider } from "@material-ui/core";
import { Tooltip } from "components/Tooltip";
import { Button, Flex, Subheading, Subtitle, Text } from "@ohfinance/oh-ui";
import { Pool } from "config/constants/types";
import { TokenInput } from "components/TokenInput";
import { Balance } from "components/Balance";
import { useState } from "react";

export const StakePoolModalContent = ({ pool }: { pool: Pool }) => {
  const [value, setValue] = useState<number>(365);

  return (
    <Box>
      <Flex center p={2}>
        <img src={pool.staked.image} alt={pool.staked.symbol} height={128} />
      </Flex>
      <Flex column center>
        <Subheading>
          <b>{pool.name} Staking</b>
        </Subheading>
        <Flex align="center" mb={2}>
          <Subtitle>Stake {pool.staked.symbol} to earn OH</Subtitle>
          <Flex center ml={1}>
            <Tooltip title="Staking" />
          </Flex>
        </Flex>
      </Flex>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            <Button fullWidth>Flexible</Button>
            <Button fullWidth>Locked</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Text>
              Lock for: <b>{value} days</b>
            </Text>
            <Text>
              Weight: <b>{(1 + value / 365).toFixed(2)}</b>
            </Text>
          </Flex>
          <Slider
            value={value}
            step={1}
            min={0}
            max={365}
            onChange={(e, next) => setValue(next as any)}
          />
        </Grid>
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Subheading align="left">{pool.staked.symbol} Balance</Subheading>
            <Subheading align="right">
              <Balance
                value={0}
                // decimals={pool.staked.decimals}
                suffix={` ${pool.staked.symbol}`}
              />
            </Subheading>
          </Flex>
          <TokenInput
            placeholder={`Stake ${pool.staked.symbol}`}
            decimals={pool.staked.decimals}
            value={0}
            onUserInput={(e) => {}}
            onMax={() => {}}
            // value={input}
            // onUserInput={(e) => setInput(e)}
            // onMax={onMaxInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Text>Estimated APR</Text>
            <Text>
              <b>
                <Balance value={25} suffix="%" decimals={2} />
              </b>
            </Text>
          </Flex>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Flex>
                <Button
                  fullWidth
                  variant="contained"
                  // onClick={onDismiss}
                >
                  Cancel
                </Button>
              </Flex>
            </Grid>
            <Grid item xs={6}>
              <Flex>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  // disabled={!input}
                  // onClick={onConfirm}
                >
                  Stake
                </Button>
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
