import { Tooltip as MuiTooltip } from "@material-ui/core";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import { FC, ReactNode } from "react";

export interface TooltipProps {
  title: string | ReactNode;
  placement?: any;
  maxWidth?: number;
  size?: number;
}

export const Tooltip: FC<TooltipProps> = ({
  title,
  placement,
  maxWidth,
  size,
}) => {
  return (
    <MuiTooltip
      title={title}
      placement={placement ?? "top"}
      style={{ maxWidth: maxWidth ?? 200 }}
      arrow
    >
      <HelpOutlineRoundedIcon
        style={{ fontSize: `${size ?? 18}px` }}
        color="primary"
      />
    </MuiTooltip>
  );
};
