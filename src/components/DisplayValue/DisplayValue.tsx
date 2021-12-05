import { Box } from "@material-ui/core";
import { Subheading, Subtitle } from "@ohfinance/oh-ui";
import { Balance, BalanceProps } from "components/Balance";
import { FC } from "react";

export interface DisplayValueProps {
  title?: string;
  value?: string | number;
}

export const DisplayValue: FC<DisplayValueProps & BalanceProps> = ({
  title,
  value,
  ...props
}) => {
  return (
    <Box>
      <Subheading align="center">
        <Balance value={value ?? 0} {...props} />
      </Subheading>
      <Subtitle align="center" color="textSecondary">
        {title}
      </Subtitle>
    </Box>
  );
};
