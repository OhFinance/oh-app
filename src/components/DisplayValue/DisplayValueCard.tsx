import { Surface } from "@ohfinance/oh-ui";
import { BalanceProps } from "components/Balance";
import { FC } from "react";
import { DisplayValue } from ".";
import { DisplayValueProps } from "./DisplayValue";

export const DisplayValueCard: FC<DisplayValueProps & BalanceProps> = ({
  ...props
}) => {
  return (
    <Surface>
      <DisplayValue {...props} />
    </Surface>
  );
};
