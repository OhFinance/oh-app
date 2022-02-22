import { makeStyles } from "@material-ui/core";

const useStakingStyles = makeStyles((theme) => ({
  row: {
    "&:last-child": {
      borderBottom: "none",
      "& td": {
        borderBottom: "none",
      },
    },
  },
  claim: {
    color: "#e7018c",
    fontWeight: 700,
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      opacity: 0.56,
    },
  },
}));

export default useStakingStyles;
