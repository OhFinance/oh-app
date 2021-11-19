import { Box, Link, Typography } from "@material-ui/core";
import { Flex, Text } from "@ohfinance/oh-ui";
import { useWeb3 } from "hooks/useWeb3";
import { useCallback } from "react";
import { useAppDispatch } from "state";
import { useAllTransactions } from "state/transactions/hooks";
import { clearAllTransactions } from "state/transactions/state";
import { Web3Transaction } from "./Web3Transaction";

export const Web3TransactionsView = () => {
  const dispatch = useAppDispatch();
  const { chainId } = useWeb3();
  const transactions = useAllTransactions();

  const handleClearTransactions = useCallback(() => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }));
    }
  }, [chainId, dispatch]);

  return (
    <Flex column p={3}>
      <Flex align="center" justify="space-between" mb={2}>
        <Typography variant="overline" color="primary">
          <b>Recent Transactions</b>
        </Typography>

        <Text style={{ fontSize: 14 }}>
          <Link
            onClick={handleClearTransactions}
            underline="hover"
            color="textPrimary"
            style={{ cursor: "pointer" }}
          >
            (Clear All)
          </Link>
        </Text>
      </Flex>
      {Object.keys(transactions).length > 0 ? (
        Object.keys(transactions).map((txHash) => (
          <Web3Transaction transaction={transactions[txHash]} />
        ))
      ) : (
        <Flex center>
          <Text>No Recent Transactions</Text>
        </Flex>
      )}
    </Flex>
  );
};
