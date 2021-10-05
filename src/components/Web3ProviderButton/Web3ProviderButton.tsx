import { Typography } from "@material-ui/core";
import { Button, Flex, useMobile } from "@ohfinance/oh-ui";
import { Connector } from "config/constants/types";
import { FC } from "react";

interface Web3ProviderButtonProps {
  connector: Connector;
  onLogin: () => void;
}

export const Web3ProviderButton: FC<Web3ProviderButtonProps> = ({
  connector,
  onLogin,
}) => {
  const { icon, title } = connector;

  const mobile = useMobile();

  return (
    <Button fullWidth variant="outlined" onClick={onLogin}>
      <Flex center column p={2}>
        <Flex>
          <img
            src={icon}
            height={mobile ? "24px" : "48px"}
            width="auto"
            alt={title}
          />
        </Flex>
        <Flex mt={1}>
          <Typography variant="body1" align="center">
            {title}
          </Typography>
        </Flex>
      </Flex>
    </Button>
  );
};
