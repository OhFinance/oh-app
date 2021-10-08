import { Box } from "@material-ui/core";
import { Heading, Paragraph, Subtitle } from "@ohfinance/oh-ui";
import { FC } from "react";

export interface PageHeadingProps {
  title: string;
  subtitle?: string;
  paragraph?: string;
}

export const PageHeading: FC<PageHeadingProps> = ({
  title,
  subtitle,
  paragraph,
  ...props
}) => {
  return (
    <Box>
      <Heading>{title}</Heading>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {paragraph && <Paragraph>{paragraph}</Paragraph>}
    </Box>
  );
};
