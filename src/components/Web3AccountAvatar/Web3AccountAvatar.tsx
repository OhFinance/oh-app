import { FC } from "react";
import md5 from "md5";
import Gravatar from "react-gravatar";

export interface Web3AccountAvatarProps {
  account?: string;
  size?: number;
}

export const Web3AccountAvatar: FC<Web3AccountAvatarProps> = ({
  account,
  size,
}) => {
  return (
    <Gravatar
      email={md5(account || "")}
      size={size || 64}
      style={{ borderRadius: (size || 64) / 2 }}
      default={!!account ? "retro" : "mp"}
      protocol="https://"
    />
  );
};
