import { Contract } from "@ethersproject/contracts";
import { Skeleton } from "@material-ui/lab";
import { Flex, Text } from "@ohfinance/oh-ui";
import { Balance } from "components/Balance";
import { Bank } from "config/constants/types";
import { useMemo } from "react";
import { getFullDisplayBalance } from "utils/formatBalances";
import { useBankStrategyBalance } from "../hooks/useBankStrategyBalance";

export const ManageStrategyBalance = ({
  bank,
  contract,
  i,
}: {
  bank: Bank;
  contract: Contract;
  i: number;
}) => {
  const strategyBalance = useBankStrategyBalance(contract, i);

  const investedBalance = useMemo(() => {
    return (
      strategyBalance &&
      getFullDisplayBalance(strategyBalance, bank.underlying.decimals)
    );
  }, [bank, strategyBalance]);

  return (
    <Flex align="center" justify="space-between">
      <Text>Strategy #{i.toString()}</Text>
      <Text>
        {investedBalance !== undefined ? (
          <Balance
            value={investedBalance}
            suffix={` ${bank.underlying.symbol}`}
          />
        ) : (
          <Skeleton width={60} height={40} />
        )}
      </Text>
    </Flex>
  );
};
