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
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(2),
  },
}));

export const AppDrawerList = ({ onDismiss }: { onDismiss?: () => void }) => {
  const classes = useStyles();
  const history = useHistory();

  const getIcon = (path: string) => {
    const key = path.slice(1);
    switch (key) {
      case "earn":
        return <MonetizationOnRoundedIcon />;
      case "stake":
        return <AssessmentRoundedIcon />;
      case "vote":
        return <AccountBalanceRoundedIcon />;
      default:
        return <DashboardRoundedIcon />;
    }
  };

  return (
    <List>
      {paths.map((path: Path, i: number) => (
        <ListItem
          key={i}
          button
          onClick={() => {
            history.push(path.path);
            onDismiss();
          }}
          className={classes.listItem}
        >
          <ListItemIcon>{getIcon(path.path)}</ListItemIcon>
          <ListItemText
            primary={path.name}
            primaryTypographyProps={{ variant: "body1" }}
          />
        </ListItem>
      ))}
    </List>
  );
};
