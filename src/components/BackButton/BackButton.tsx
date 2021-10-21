import { Button } from "@ohfinance/oh-ui";
import { FC } from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

export interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: FC<BackButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      color="primary"
      startIcon={<ArrowBackRoundedIcon />}
      onClick={onClick}
      {...props}
    >
      {children ?? "Go Back"}
    </Button>
  );
};
