import { Box } from "@material-ui/core"
import { Subheading, Subtitle, Surface } from "@ohfinance/oh-ui"
import { Balance } from "components/Balance"
import { FC } from "react"

export interface StakeValueCardProps {
  title: string;
  value?: string | number;
}

export const StakeValueCard: FC<StakeValueCardProps> = ({ title, value }) => {
  return (
    <Surface>
      <Box>
        <Subheading align='center'>
          <Balance value={value ?? 0} />
        </Subheading>
        <Subtitle align="center" color="textSecondary">
          {title}
        </Subtitle>
      </Box>
    </Surface>
  )
}
