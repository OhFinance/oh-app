import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    borderRadius: 4,
  },
}));

export const TextSkeleton: FC<{ height?: number; width?: number }> = ({
  height,
  width,
}) => {
  const classes = useStyles();
  return (
    <Skeleton className={classes.skeleton} height={height} width={width} />
  );
};
