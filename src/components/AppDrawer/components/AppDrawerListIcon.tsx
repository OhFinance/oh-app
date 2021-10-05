import { FC, Fragment, useCallback } from "react";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import TimelapseRoundedIcon from "@material-ui/icons/TimelapseRounded";
import UpdateIcon from "@material-ui/icons/Update";

export interface AppDrawerListIconProps {
  path: string;
}

export const AppDrawerListIcon: FC<AppDrawerListIconProps> = ({ path }) => {
  const getIcon = useCallback(() => {
    const key = path.slice(1);
    switch (key) {
      case "earn":
        return <MonetizationOnRoundedIcon />;
      case "stake":
        return <AssessmentRoundedIcon />;
      case "vote":
        return <AccountBalanceRoundedIcon />;
      case "claim":
        return <QueueRoundedIcon />;
      // return <TimelapseRoundedIcon />;
      // return <UpdateIcon />;
      default:
        // uncomment when dashboard is active
        // return <DashboardRoundedIcon />;
        return <MonetizationOnRoundedIcon />;
    }
  }, [path]);

  return <Fragment>{getIcon()}</Fragment>;
};
