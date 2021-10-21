import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Flex, Modal, ModalProps } from "@ohfinance/oh-ui";
import { LinkButton } from "components/LinkButton";
import { Bank } from "config/constants/types";
import { FC } from "react";
import { useNetwork } from "hooks/useNetwork";
import { useAddress } from "hooks/useAddress";

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
      <Box p={3}>
        <Flex p={2} center>
          <img src={bank.image} alt={bank.symbol} height={128} width="auto" />
        </Flex>
        <Flex center>
          <Typography variant="h6">{bank.symbol}</Typography>
        </Flex>
        <Flex center>
          <LinkButton link={`${blockExplorerUrl}/address/${address}`}>
            Contract Address
          </LinkButton>
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
