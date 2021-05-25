import { IconButton } from "@material-ui/core";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <IconButton onClick={() => setOpen(true)}>
      <FaBars />
    </IconButton>
  );
};
