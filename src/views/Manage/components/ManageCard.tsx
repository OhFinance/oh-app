import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  Button,
  Flex,
  Subheading,
  Subtitle,
  Surface,
  Text,
} from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { LinkButton } from "components/LinkButton";
import { Bank } from "config/constants/types";
import { useAddress } from "hooks/useAddress";
import { useBankContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import { FC, useMemo } from "react";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useBankManageData } from "../hooks/useBankManageData";
import { ManageStrategyBalance } from "./ManageStrategyBalance";

export interface ManageCardProps {
  bank: Bank;
  txPending: boolean;
  onFinance: (address: string) => void;
  onFinanceAll: (address: string) => void;
  onRebalance: (address: string) => void;
}

export const ManageCard: FC<ManageCardProps> = ({
  bank,
  txPending,
  onFinance,
  onFinanceAll,
  onRebalance,
}) => {
  const { blockExplorerUrl } = useNetwork();

  const bankAddress = useAddress(bank.address);
  const bankContract = useBankContract(bankAddress);
  const { underlyingBalance, totalStrategies } =
    useBankManageData(bankContract);

  const awaitingBalance = useMemo(() => {
    return (
      underlyingBalance &&
      getFullDisplayBalance(underlyingBalance, bank.underlying.decimals)
    );
  }, [underlyingBalance, bank]);

  return (
    <Surface>
      <Flex align="center" justify="space-between">
        <Subheading>{bank.name}</Subheading>

        <LinkButton link={`${blockExplorerUrl}/address/${bankAddress}`}>
          Contract
        </LinkButton>
      </Flex>
      <Subtitle color="textSecondary">{bankAddress}</Subtitle>

      <Box my={2}>
        <Flex align="center" justify="space-between">
          <Text>Awaiting Investment</Text>
          <Text>
            {awaitingBalance !== undefined ? (
              <Balance
                value={awaitingBalance}
                suffix={` ${bank.underlying.symbol}`}
              />
            ) : (
              <Skeleton width={60} height={40} />
            )}
          </Text>
        </Flex>
      </Box>

      <Box my={2}>
        {totalStrategies !== undefined
          ? [...Array(totalStrategies.toNumber())].map((_, i: number) => (
              <ManageStrategyBalance
                key={i}
                bank={bank}
                contract={bankContract}
                i={i}
              />
            ))
          : [...Array(3)].map((_, i: number) => (
              <Flex key={i} align="center" justifyContent="space-between">
                <Skeleton width={120} height={40} />
                <Skeleton width={120} height={40} />
              </Flex>
            ))}
      </Box>

      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={txPending}
            onClick={() => onFinance(bankAddress)}
          >
            Finance
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={txPending}
            onClick={() => onFinanceAll(bankAddress)}
          >
            Finance All
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={txPending}
            onClick={() => onRebalance(bankAddress)}
          >
            Rebalance
          </Button>
        </Grid>
      </Grid>
    </Surface>
  );
};
