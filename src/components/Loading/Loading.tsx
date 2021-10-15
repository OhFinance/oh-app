import { Display, OH_LOADING_URL } from "@ohfinance/oh-ui";

export const Loading = () => {
  return (
    <Display center pullTop>
      <img src={OH_LOADING_URL} alt="oh-loading" height={150} width="auto" />
    </Display>
  );
};
