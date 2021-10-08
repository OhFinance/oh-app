import { Box, Divider, TableContainer, Typography } from "@material-ui/core";
import { Surface } from "@ohfinance/oh-ui";
import { FC, Fragment } from "react";

const TableSurfaceComponent = ({ children }) => {
  return <Surface p={0}>{children}</Surface>;
};

export interface TableSurfaceProps {
  title?: string;
  divider?: boolean;
}

export const TableSurface: FC<TableSurfaceProps> = ({
  title,
  divider = false,
  children,
}) => {
  return (
    <TableContainer component={TableSurfaceComponent}>
      {title && (
        <Box p={2}>
          <Typography>
            <b>{title}</b>
          </Typography>
        </Box>
      )}
      {divider && <Divider />}

      {children}
    </TableContainer>
  );
};
