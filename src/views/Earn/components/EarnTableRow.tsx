import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: "none",
  },
}));

export interface EarnTableRowProps {
  isLast?: boolean;
}

export const EarnTableRow: FC<EarnTableRowProps> = ({ isLast, ...props }) => {
  const classes = useStyles();

  return (
    <TableRow {...props}>
      <TableCell className={isLast && classes.cell}>img</TableCell>
      <TableCell className={isLast && classes.cell}>
        OhUSDC - Standard
      </TableCell>
      <TableCell className={isLast && classes.cell}>
        AaveV2 - Compound - Curve
      </TableCell>
      <TableCell className={isLast && classes.cell}>18%</TableCell>
      <TableCell className={isLast && classes.cell}></TableCell>
    </TableRow>
  );
};
