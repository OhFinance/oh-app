import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Button, Flex } from "@ohfinance/oh-ui";
import { FC } from "react";
import { FaCircle } from "react-icons/fa";

interface Web3NetworkModalButtonProps {
  networkIcon: string;
  chainName: string;
  onClick: () => void;
  active?: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "flex-start",
    // padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  grid: {
    paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
  },
  avatar: {
    height: "32px",
    width: "32px",
    color: "#efc45c",
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
      startIcon={<Avatar src={networkIcon} className={classes.avatar} />}
      variant={!!active ? "outlined" : "text"}
      onClick={onClick}
    >
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.grid}
      >
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
