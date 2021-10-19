import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import paths from "config/constants/paths";
import { Path } from "config/constants/types";
import { useHistory } from "react-router";
import { AppDrawerListIcon } from "./AppDrawerListIcon";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(2),
  },
}));

export const AppDrawerList = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <List>
      {paths.map((path: Path, i: number) => (
        <ListItem
          key={i}
          button
          onClick={() => history.push(path.path)}
          className={classes.listItem}
        >
          <ListItemIcon>
            <AppDrawerListIcon path={path.path} />
          </ListItemIcon>
          <ListItemText
            primary={path.name}
            primaryTypographyProps={{ variant: "body1" }}
          />
        </ListItem>
      ))}
    </List>
  );
};
