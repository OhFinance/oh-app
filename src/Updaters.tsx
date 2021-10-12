import { Fragment } from "react";
import { MulticallUpdater } from "state/multicall/updater";
import { TransactionUpdater } from "state/transactions/updater";

export const Updaters = () => {
  return (
    <Fragment>
      <TransactionUpdater />
      <MulticallUpdater />
    </Fragment>
  );
};
