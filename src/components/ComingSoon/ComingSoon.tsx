import { makeStyles } from "@material-ui/core";
import {
  Flex,
  Heading,
  IconButton,
  MediumButton,
  MEDIUM_URL,
  OH_LOGO_URL,
  Paragraph,
  TelegramButton,
  TwitterButton,
  TWITTER_URL,
} from "@ohfinance/oh-ui";
import { FaMediumM, FaTwitter } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  fill: {
    height: "100%",
    marginTop: "-128px",
  },
}));

export const ComingSoon = () => {
  const classes = useStyles();

  return (
    <Flex column center grow={1} className={classes.fill}>
      <Flex my={2}>
        <img
          src={OH_LOGO_URL}
          alt="oh-finance-brand"
          width={250}
          height="auto"
        />
      </Flex>
      <Heading align="center">Coming Soon</Heading>
      <Paragraph align="center">
        Follow us on Social Media for the latest updates
      </Paragraph>
      <Flex center>
        <TwitterButton />
        <TelegramButton />
        <MediumButton />
      </Flex>
    </Flex>
  );
};
