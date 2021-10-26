import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Flex, Subheading, Subtitle } from "@ohfinance/oh-ui";
import { TableSurface } from "components/TableSurface";
import banks from "config/constants/banks";
import { Bank } from "config/constants/types";
import { EarnTableRow } from "./EarnTableRow";

export const EarnTableView = () => {
  return (
    <TableSurface>
      <Flex p={2} align="baseline">
        <Box mr={1}>
          <Subheading gutterBottom={false}>DeFi Indexes</Subheading>
        </Box>
        <Subtitle paragraph={false} color="textSecondary">
          ({banks.length} Indexes)
        </Subtitle>
      </Flex>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Chain</TableCell>
            {/* <TableCell>Description</TableCell> */}
            <TableCell align="center">Underlying</TableCell>
            <TableCell align="center">Composition</TableCell>
            {/* <TableCell align="center">APR</TableCell> */}
            <TableCell align="center">TVL</TableCell>
            <TableCell align="center">My Holdings</TableCell>
            <TableCell align="center">Deposit</TableCell>
            <TableCell align="center">Withdraw</TableCell>
            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banks.map((bank: Bank, i: number) => (
            <EarnTableRow key={i} bank={bank} isLast={i === banks.length - 1} />
          ))}
        </TableBody>
      </Table>
    </TableSurface>
  );
};
