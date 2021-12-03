import {
  Flex,
  Heading,
  Subheading,
  Subtitle,
  Surface,
  Text,
  useModal,
} from "@ohfinance/oh-ui";
import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { FC, useMemo } from "react";
import { Bank } from "config/constants/types";
import { getFullDisplayBalance } from "utils/formatBalances";
import { EarnDetailModal } from "../EarnDetailModal";
import { EarnDepositModal } from "../EarnDepositModal";
import { EarnWithdrawModal } from "../EarnWithdrawModal";
import { useAddress } from "hooks/useAddress";
import { useTokenBalance } from "hooks/useTokenBalance";
import { Balance } from "components/Balance";
import { useBankData } from "views/Earn/hooks/useBankData";
import { Skeleton } from "@material-ui/lab";
import { useBankAPYData } from "state/banks/hooks";
import { Tooltip, TooltipText } from "components/Tooltip";
import { useWeb3 } from "hooks/useWeb3";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

export interface EarnCardProps {
  bank: Bank;
}

export const EarnCard: FC<EarnCardProps> = ({ bank }) => {
  const [onPresentDetailModal] = useModal(<EarnDetailModal bank={bank} />);
  const [onPresentDepositModal] = useModal(<EarnDepositModal bank={bank} />);
  const [onPresentWithdrawModal] = useModal(<EarnWithdrawModal bank={bank} />);

  const { chainId } = useWeb3();
  const address = useAddress(bank.address);
  const { balance } = useTokenBalance(address);
  const { virtualBalance, virtualPrice, getShareValue } = useBankData(address);
  const apys = useBankAPYData(chainId, bank.address[chainId]);

  const tvl = useMemo(() => {
    return (
      virtualBalance && getFullDisplayBalance(virtualBalance, bank.decimals)
    );
  }, [virtualBalance, bank]);

  const sharePrice = useMemo(() => {
    return virtualPrice && getFullDisplayBalance(virtualPrice, bank.decimals);
  }, [virtualPrice, bank]);

  const balanceAmount = useMemo(() => {
    return balance && getFullDisplayBalance(balance, bank.decimals);
  }, [balance, bank]);

  const shareValue = useMemo(() => {
    return balance && getShareValue(balance, bank.decimals);
  }, [balance, bank, getShareValue]);

  const balanceValue = useMemo(() => {
    return shareValue && getFullDisplayBalance(shareValue, bank.decimals);
  }, [shareValue, bank]);

  return (
    <Surface>
      <Flex m={2} align="center">
        <Box mr={2}>
          <img src={bank.image} alt={bank.alt} height={96} width="auto" />
        </Box>
        <Flex column>
          <Heading align="left">
            <b>{bank.name}</b>
          </Heading>
          <Flex center>
            <Flex center>
              <Subtitle align="left" color="textSecondary">
                Deposit {bank.underlying.symbol} to earn yield
              </Subtitle>
            </Flex>
            <Flex center ml={1}>
              <Tooltip
                title={
                  <TooltipText>
                    Deposit {bank.underlying.symbol} to receive {bank.symbol},
                    which automatically earns interest in{" "}
                    {bank.underlying.symbol} until withdrawal.
                  </TooltipText>
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Box m={4}>
        <Flex align="center" justify="space-between">
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={4}
          >
            <Grid item xs={12}>
              <Flex align="center" justify="space-between">
                <Flex>
                  <Text align="center">APY</Text>
                  <Flex center ml={1}>
                    <Tooltip
                      title={
                        <TooltipText>
                          Annual Percentage Yield, expected rate of return after
                          one year.
                        </TooltipText>
                      }
                    />
                  </Flex>
                </Flex>

                {apys && apys.length ? (
                  <Flex center>
                    <Subheading align="center">
                      <b>
                        <Balance value={apys[0].apy} decimals={2} suffix="%" />
                      </b>
                    </Subheading>
                    <Flex center ml={1}>
                      <Tooltip
                        icon="chart"
                        title={
                          <>
                            <TooltipText>
                              Daily APY: {apys[0].apy.toFixed(2)}%
                            </TooltipText>
                            <TooltipText>
                              Weekly APY: {apys[1].apy.toFixed(2)}%
                            </TooltipText>
                            <TooltipText>
                              Monthly APY: {apys[2].apy.toFixed(2)}%
                            </TooltipText>
                          </>
                        }
                      />
                    </Flex>
                  </Flex>
                ) : (
                  <Skeleton width={80} height={40} />
                )}
              </Flex>
            </Grid>
            <Grid item xs={12}>
              <Flex align="center" justify="space-between">
                <Flex>
                  <Text align="center">TVL</Text>
                  <Flex center ml={1}>
                    <Tooltip
                      title={
                        <TooltipText>
                          Total Value Locked, value of all tokens deposited in
                          the {bank.name} Bank.
                        </TooltipText>
                      }
                    />
                  </Flex>
                </Flex>

                {tvl !== undefined ? (
                  <Flex center>
                    <Subheading align="center">
                      <b>
                        <Balance value={tvl} decimals={2} prefix="$" />
                      </b>
                    </Subheading>
                  </Flex>
                ) : (
                  <Skeleton width={80} height={40} />
                )}
              </Flex>
            </Grid>
            <Grid item xs={12}>
              <Flex align="center" justify="space-between">
                <Flex>
                  <Text align="center">Share Price</Text>
                  <Flex center ml={1}>
                    <Tooltip
                      title={
                        <TooltipText>
                          The value of 1 {bank.symbol}, which automatically
                          increases as yield is earned and compounded.
                        </TooltipText>
                      }
                    />
                  </Flex>
                </Flex>
                {sharePrice !== undefined ? (
                  <Flex center>
                    <Subheading align="center">
                      <b>
                        <Balance value={sharePrice} prefix="$" />
                      </b>
                    </Subheading>
                  </Flex>
                ) : (
                  <Skeleton width={80} height={40} />
                )}
              </Flex>
            </Grid>
          </Grid>
        </Flex>
      </Box>

      <Box m={4}>
        <Flex align="center" justify="space-between">
          <Flex column>
            <Typography variant="overline" color="primary">
              <b>{bank.symbol} Balance</b>
            </Typography>

            {balanceValue !== undefined ? (
              <Flex column>
                <Subheading
                  color={balance.gt(0) ? "textPrimary" : "textSecondary"}
                >
                  <b>
                    <Balance value={balanceValue} prefix="$" />
                  </b>
                </Subheading>
                <Subtitle color="textSecondary" style={{ fontSize: 10 }}>
                  <Balance value={balanceAmount} suffix={` ${bank.symbol}`} />
                </Subtitle>
              </Flex>
            ) : (
              <Skeleton width={80} height={40} />
            )}
          </Flex>

          <Flex align="center">
            {balance && balance.eq(0) ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onPresentDepositModal}
              >
                Deposit
              </Button>
            ) : (
              <Flex align="center">
                <Box mr={1}>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={onPresentDepositModal}
                  >
                    <AddRoundedIcon color="primary" />
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  color="default"
                  onClick={onPresentWithdrawModal}
                >
                  <RemoveRoundedIcon color="primary" />
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
      <Divider />
      <Box mt={2}>
        <Text
          color="primary"
          align="center"
          style={{ cursor: "pointer" }}
          onClick={onPresentDetailModal}
        >
          <b>Details</b>
        </Text>
      </Box>
    </Surface>
  );
};
