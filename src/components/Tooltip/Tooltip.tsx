import { Box, Tooltip as MuiTooltip } from "@material-ui/core";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import { FC, ReactNode } from "react";

export interface TooltipProps {
  title: string | ReactNode;
  placement?: any;
  maxWidth?: number;
  size?: number;
  icon?: "help" | "chart";
}

export const Tooltip: FC<TooltipProps> = ({
  title,
  placement,
  maxWidth,
  size,
  icon = "help",
}) => {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return (
          <AssessmentRoundedIcon
            style={{ fontSize: `${size ?? 18}px` }}
            color="inherit"
          />
        );

      default:
        return (
          <HelpOutlineRoundedIcon
            style={{ fontSize: `${size ?? 18}px` }}
            color="primary"
          />
        );
    }
  };

  return (
    <MuiTooltip
      title={<Box p={1}>{title}</Box>}
      placement={placement ?? "top"}
      style={{ maxWidth: maxWidth ?? 200 }}
      disableFocusListener
      arrow
    >
      {getIcon()}
    </MuiTooltip>
  );
};
