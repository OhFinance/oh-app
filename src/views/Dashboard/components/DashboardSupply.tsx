import { Skeleton } from "@material-ui/lab";
import { Flex, Surface, Text } from "@ohfinance/oh-ui";
import tokens from "config/constants/tokens";
import useTotalSupply from "hooks/useTotalSupply";
import { useCirculatingSupply } from "state/supply/hooks";

export const DashboardSupply = () => {
  const [circulatingSupply] = useCirculatingSupply();
  const totalSupply = useTotalSupply(tokens.ohToken.address[1]);

  return (
    <Surface>
      <Flex align="center" justify="space-between">
        <Text>Circulating Supply</Text>
        {circulatingSupply && totalSupply ? (
          <Text>
            {circulatingSupply}/{totalSupply.toString()}
          </Text>
        ) : (
          <Skeleton width={80} height={30} />
        )}
      </Flex>
      <Flex align="center" justify="space-between">
        <Text color="textSecondary">Ethereum Supply</Text>
        {circulatingSupply !== undefined ? (
          <Text color="textSecondary">{circulatingSupply}</Text>
        ) : (
          <Skeleton width={80} height={40} />
        )}
      </Flex>
      <Flex align="center" justify="space-between">
        <Text color="textSecondary">Avalanche Supply</Text>
        {circulatingSupply !== undefined ? (
          <Text color="textSecondary">{circulatingSupply}</Text>
        ) : (
          <Skeleton width={80} height={40} />
        )}
      </Flex>
    </Surface>
  );
};
