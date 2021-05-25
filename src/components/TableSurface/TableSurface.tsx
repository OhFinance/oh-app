import { TableContainer } from "@material-ui/core";
import { Surface } from "components/Surface";

const TableSurfaceComponent = ({ children }) => {
  return <Surface p={0}>{children}</Surface>;
};

export const TableSurface = ({ children }) => {
  return (
    <TableContainer component={TableSurfaceComponent}>
      {children}
    </TableContainer>
  );
};
