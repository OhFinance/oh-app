import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableSurface } from "components/TableSurface";
import { EarnTableRow } from "./EarnTableRow";

export const EarnTable = () => {
  return (
    <TableSurface>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Composition</TableCell>
            <TableCell>APY</TableCell>
            <TableCell>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <EarnTableRow key={0} isLast />
        </TableBody>
        <TableFooter />
      </Table>
    </TableSurface>
  );
};
