import { Grid } from "@material-ui/core";
import banks from "config/constants/banks";
import contracts from "config/constants/contracts";
import { Bank } from "config/constants/types";
import { useManagerContract } from "hooks/useContract";
import { useWeb3 } from "hooks/useWeb3";
import { useCallback, useState } from "react";
import { useTransactionAdder } from "state/transactions/hooks";
import { ManageCard } from "./components/ManageCard";

const Manage = () => {
  const [txPending, setTxPending] = useState<boolean>(false);
  const addTransaction = useTransactionAdder();

  const { chainId } = useWeb3();
  const managerContract = useManagerContract(contracts.manager[chainId]);

  const handleFinance = useCallback(
    async (address: string) => {
      setTxPending(true);

      await managerContract
        .finance(address)
        .then((response) => {
          setTxPending(false);
          addTransaction(response, { summary: `Finance - ${address}` });
        })
        .catch((error) => {
          setTxPending(false);
        });
    },
    [addTransaction, managerContract]
  );

  const handleFinanceAll = useCallback(
    async (address: string) => {
      setTxPending(true);

      await managerContract
        .financeAll(address)
        .then((response) => {
          setTxPending(false);
          addTransaction(response, { summary: `Finance All - ${address}` });
        })
        .catch((error) => {
          setTxPending(false);
        });
    },
    [addTransaction, managerContract]
  );

  const handleRebalance = useCallback(
    async (address: string) => {
      setTxPending(true);

      await managerContract
        .rebalance(address)
        .then((response) => {
          setTxPending(false);
          addTransaction(response, { summary: `Rebalance - ${address}` });
        })
        .catch((error) => {
          setTxPending(false);
        });
    },
    [addTransaction, managerContract]
  );

  return (
    <Grid container justify="center" spacing={4}>
      {banks[chainId].map((bank: Bank, i: number) => (
        <Grid item key={i} xs={12} md={8}>
          <ManageCard
            bank={bank}
            txPending={txPending}
            onFinance={handleFinance}
            onFinanceAll={handleFinanceAll}
            onRebalance={handleRebalance}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Manage;
