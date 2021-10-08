import { useHistory } from "react-router";
import { Button, Display, Flex, Heading, useMobile } from "@ohfinance/oh-ui";
import { FaHome } from "react-icons/fa";
import OhBrand from "assets/img/oh-brand.png";

const NoMatch = () => {
  const history = useHistory();
  const mobile = useMobile();

  return (
    <Display center pullTop>
      <Flex my={2}>
        <img
          src={OhBrand}
          alt="oh-finance-brand"
          width={mobile ? "250px" : "500px"}
          height="auto"
        />
      </Flex>

      <Heading align="center">Page Not Found</Heading>

      <Button
        variant="contained"
        startIcon={<FaHome />}
        onClick={() => history.push("/")}
      >
        Return Home
      </Button>
    </Display>
  );
};

export default NoMatch;
