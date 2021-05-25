import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewModuleRoundedIcon from "@material-ui/icons/ViewModuleRounded";
import { EarnSearchBar } from "./EarnSearchBar";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    height: 40,
  },
}));

export const EarnSettings = () => {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item>
          <Hidden smDown>
            <ButtonGroup color="default">
              <Button className={classes.button}>
                <ViewListRoundedIcon />
              </Button>
              <Button className={classes.button}>
                <ViewModuleRoundedIcon />
              </Button>
            </ButtonGroup>
          </Hidden>
        </Grid>
        <Grid item>
          <EarnSearchBar />
        </Grid>
      </Grid>
    </Box>
  );
};
