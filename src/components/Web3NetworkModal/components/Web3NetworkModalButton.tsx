import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Button, Flex } from "@ohfinance/oh-ui";
import { FC, useCallback } from "react";
import { FaCircle } from "react-icons/fa";
import { setupNetwork } from "utils/wallet";

interface Web3NetworkModalButtonProps {
  networkIcon: string;
  chainName: string;
  onClick: () => void;
  active?: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
    padding: theme.spacing(2),
  },
  activeIcon: {
    color: theme.palette.success.main,
  },
}));

export const Web3NetworkModalButton: FC<Web3NetworkModalButtonProps> = ({
  networkIcon,
  chainName,
  onClick,
  active,
}) => {
  const classes = useStyles();

  return (
    <Button
      fullWidth
      className={classes.button}
      startIcon={<Avatar src={networkIcon} />}
      variant={!!active ? "outlined" : "text"}
      onClick={onClick}
    >
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Box ml={1} mr={8}>
            <Typography variant="body1" align="left">
              {chainName}
            </Typography>
          </Box>
        </Grid>
        {!!active && (
          <Grid item xs={1}>
            <Flex>
              <FaCircle className={classes.activeIcon} />
            </Flex>
          </Grid>
        )}
      </Grid>
    </Button>
  );
};
