import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Flex, Modal, ModalProps, Subheading } from "@ohfinance/oh-ui";
import { LinkButton } from "components/LinkButton";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { useNetwork } from "hooks/useNetwork";
import { useAddress } from "hooks/useAddress";
import { Alert } from "@material-ui/lab";
import { RegisterTokenButton } from "components/RegisterTokenButton";

export interface EarnDetailModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDetailModal: FC<EarnDetailModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  const { blockExplorerUrl } = useNetwork();
  const address = useAddress(bank.address);

  return (
    <Modal
      title={`${bank.name} Details`}
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      p={0}
      maxWidth="lg"
      fullWidth
    >
      <Alert severity="warning">
        Do not send tokens directly to the contract address. You will not be
        able to retrieve them!
      </Alert>
      <Box p={3}>
        <Flex p={2} center>
          <img src={bank.image} alt={bank.symbol} height={128} width="auto" />
        </Flex>
        <Flex center>
          <Subheading>{bank.symbol}</Subheading>
        </Flex>
        <Flex center>
          <LinkButton link={`${blockExplorerUrl}/address/${address}`}>
            View on Block Explorer
          </LinkButton>
        </Flex>

        <Flex center my={2}>
          <RegisterTokenButton
            symbol={bank.symbol}
            address={address}
            decimals={bank.decimals}
          />
        </Flex>
      </Box>
      <Flex>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">{bank.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Symbol</TableCell>
              <TableCell align="right">{bank.symbol}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Underlying</TableCell>
              <TableCell align="right">{bank.underlying.symbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Strategies</TableCell>
              <TableCell align="right">
                {bank.strategies
                  .map((strategy) => strategy.protocol)
                  .join(", ")}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">{bank.description}</TableCell>
          </TableRow>
        </Table>
      </Flex>
    </Modal>
  );
};
