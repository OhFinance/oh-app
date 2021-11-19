import { Link } from "@material-ui/core";
import { Flex, Text } from "@ohfinance/oh-ui";
import { useNetwork } from "hooks/useNetwork";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { Spinner } from "components/Spinner";

export const Web3Transaction = ({ transaction }) => {
  const { blockExplorerUrl } = useNetwork();

  return (
    <Flex align="center" justify="space-between" mb={1}>
      <Text style={{ fontSize: 16 }}>
        <Link
          target="_blank"
          rel="noopenner"
          underline="hover"
          href={`${blockExplorerUrl}/tx/${transaction.hash}`}
          color="textPrimary"
        >
          {transaction.summary}
        </Link>
      </Text>
      <Flex center>
        {transaction.receipt === undefined && <Spinner size={16} />}
        {transaction.receipt && transaction.receipt.status === 0 && (
          <ClearRoundedIcon color="secondary" />
        )}
        {transaction.receipt && transaction.receipt.status === 1 && (
          <CheckRoundedIcon color="primary" />
        )}
      </Flex>
    </Flex>
  );
};
