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

interface EarnDetailsModalProps extends ModalProps {
  bank: Bank;
}

export const EarnDetailsModal: FC<EarnDetailsModalProps> = ({
  isOpen,
  onDismiss,
  bank,
}) => {
  return (
    <Modal
      title={`${bank.symbol} Details`}
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      p={0}
      fullWidth
    >
      <Box p={3}>
        <Flex p={2} center>
          <Avatar
            src={bank.image}
            style={{ height: "128px", width: "128px" }}
          />
        </Flex>
        <Flex center>
          <Typography variant="h6">{bank.symbol}</Typography>
        </Flex>
        <Flex center>
          <LinkButton link={"https://"}>Contract Address</LinkButton>
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
              <TableCell align="left">Composition</TableCell>
              <TableCell align="right">{bank.composition.join(", ")}</TableCell>
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
