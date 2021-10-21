import { FC } from "react";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Bank } from "config/constants/types";

const useStyles = makeStyles((theme) => ({
  group: {
    border: "none",
  },
}));

export const EarnStrategyGroup = ({ bank }: { bank: Bank }) => {
  const classes = useStyles();
  return (
    <AvatarGroup max={5} classes={{ avatar: classes.group }}>
      {bank.strategies.map((strategy, i: number) => (
        <img
          height={40}
          width="auto"
          key={i}
          src={strategy.image}
          alt={strategy.protocol}
        />
      ))}
    </AvatarGroup>
  );
};
