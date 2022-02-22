import { Fragment } from "react";
import { APYUpdater } from "state/apy/updater";
import { BankUpdater } from "state/banks/updater";
import { MulticallUpdater } from "state/multicall/updater";
import { PriceUpdater } from "state/prices/updater";
import { SupplyUpdater } from "state/supply/updater";
import { TransactionUpdater } from "state/transactions/updater";
import { TVLUpdater } from "state/tvl/updater";
import Updater from "state/application/updater";

export const Updaters = () => {
  return (
    <Fragment>
      <Updater />
      <APYUpdater />
      <BankUpdater />
      <MulticallUpdater />
      <PriceUpdater />
      <SupplyUpdater />
      <TransactionUpdater />
      <TVLUpdater />
    </Fragment>
  );
};
