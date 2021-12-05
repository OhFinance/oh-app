import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Flex, Text } from "@ohfinance/oh-ui";
import { supportedTokenPrices } from "config/constants/tokens";
import { usePriceManager } from "state/prices/hooks";

export const AppDrawerPrices = () => {
  const [prices] = usePriceManager();

  return (
    <Grid container spacing={1} justify="center">
      {supportedTokenPrices.map((symbol, i) => (
        <Grid item key={i} xs={8}>
          {prices[symbol] !== undefined ? (
            <Flex align="center" justify="space-between">
              <Text style={{ fontSize: 11 }}>{symbol}</Text>
              <Text style={{ fontSize: 11 }}>
                <b>{prices[symbol].toPrecision(5)} USD</b>
              </Text>
            </Flex>
          ) : (
            <Skeleton width={160} height={20} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
