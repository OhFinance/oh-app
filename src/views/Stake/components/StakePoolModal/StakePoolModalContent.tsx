import { Box, ButtonGroup, Grid, Slider } from "@material-ui/core";
import { Tooltip } from "components/Tooltip";
import { Button, Flex, Subheading, Subtitle, Text } from "@ohfinance/oh-ui";
import { Pool } from "config/constants/pools";
import { TokenInput } from "components/TokenInput";
import { Balance } from "components/Balance";
import React, { useCallback, useMemo, useState } from "react";
import { usePoolTokenBalance } from "state/staking/hooks";
import { getFullDisplayBalance } from "utils/formatBalances";
import BigNumber from "bignumber.js";
import { TEN } from "utils/bigNumber";

export const StakePoolModalContent = ({
  pool,
  addTransaction,
}: {
  pool: Pool;
  addTransaction: (duration?: number, amount?: string) => void;
}) => {
  const [value, setValue] = useState<number>(365);
  const userBalance = usePoolTokenBalance(pool);

  const [type, setType] = useState<0 | 1>(1);

  const [amount, setAmount] = useState<string>();

  const onInput = useCallback(
    (value: string) => {
      setAmount(value);
    },
    [setAmount]
  );

  const durationInSeconds = useMemo(
    () => Math.floor(value * 24 * 60 * 60),
    [value]
  );

  const parsedAmount = useMemo(
    () => new BigNumber(amount).times(TEN.pow(pool.token.decimals)).toString(),
    [amount, pool.token.decimals]
  );

  const onSubmit = useCallback(() => {
    if (type === 0) {
      addTransaction(undefined, parsedAmount);
    } else {
      addTransaction(durationInSeconds, parsedAmount);
    }
  }, [addTransaction, type, parsedAmount, durationInSeconds]);

  const isValid = useMemo(
    () =>
      userBalance !== null &&
      new BigNumber(amount)
        .times(TEN.pow(pool.token.decimals))
        .lte(userBalance),

    [userBalance, amount, pool.token.decimals]
  );

  return (
    <Box>
      <Flex center p={2}>
        <img src={pool.token.image} alt={pool.token.symbol} height={128} />
      </Flex>
      <Flex column center>
        <Subheading>
          <b>{pool.label} Staking</b>
        </Subheading>
        <Flex align="center" mb={2}>
          <Subtitle>Stake {pool.token.symbol} to earn OH</Subtitle>
          <Flex center ml={1}>
            <Tooltip title="Staking" />
          </Flex>
        </Flex>
      </Flex>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <ButtonGroup fullWidth disableElevation>
            <Button
              color={type === 0 ? "primary" : "default"}
              variant={type === 0 ? "contained" : "outlined"}
              fullWidth
              onClick={() => setType(0)}
            >
              Flexible
            </Button>
            <Button
              color={type === 1 ? "primary" : "default"}
              variant={type === 1 ? "contained" : "outlined"}
              fullWidth
              onClick={() => setType(1)}
            >
              Locked
            </Button>
          </ButtonGroup>
        </Grid>
        {type === 1 && (
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
        )}
        <Grid item xs={12}>
          <Flex align="center" justify="space-between">
            <Subheading align="left">{pool.token.symbol} Balance</Subheading>
            <Subheading align="right">
              <Balance
                value={
                  userBalance !== null
                    ? getFullDisplayBalance(userBalance, pool.token.decimals)
                    : 0
                }
                // decimals={pool.staked.decimals}
                suffix={` ${pool.token.symbol}`}
              />
            </Subheading>
          </Flex>
          <TokenInput
            placeholder={`Stake ${pool.token.symbol}`}
            decimals={pool.token.decimals}
            value={amount}
            onUserInput={onInput}
            onMax={() =>
              userBalance !== null &&
              onInput(getFullDisplayBalance(userBalance, pool.token.decimals))
            }
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
                  disabled={!isValid}
                  // disabled={!input}
                  // onClick={onConfirm}
                  onClick={onSubmit}
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
