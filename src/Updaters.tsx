import { Fragment } from "react";
import { BankUpdater } from "state/banks/updater";
import { MulticallUpdater } from "state/multicall/updater";
import { PriceUpdater } from "state/prices/updater";
import { SupplyUpdater } from "state/supply/updater";
import { TransactionUpdater } from "state/transactions/updater";
import { TVLUpdater } from "state/tvl/updater";

export const Updaters = () => {
  return (
    <Fragment>
      <BankUpdater />
      <MulticallUpdater />
      <PriceUpdater />
      {/* <SupplyUpdater /> */}
      <TransactionUpdater />
      {/* <TVLUpdater /> */}
    </Fragment>
  );
};
