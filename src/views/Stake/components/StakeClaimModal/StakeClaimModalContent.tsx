import { Box } from "@material-ui/core";
import { Pool } from "config/constants/types";
import { FC } from "react";

export interface StakeClaimModalContentProps {
  pool: Pool;
}

export const StakeClaimModalContent: FC<StakeClaimModalContentProps> = ({
  pool,
}) => {
  return <Box></Box>;
};
