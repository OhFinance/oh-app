import { Box, makeStyles } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3NoAccount } from "components/Web3NoAccount";
import { DRAWER_WIDTH } from "config/constants/values";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH,
    },
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));

export const ViewWrapper = ({ children }) => {
  const classes = useStyles();
  const { account } = useWeb3React();

  return (
    <Box className={classes.wrapper}>
      {!!account ? children : <Web3NoAccount />}
    </Box>
  );
};
