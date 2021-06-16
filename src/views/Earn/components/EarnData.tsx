import { useMobile } from "@ohfinance/oh-ui";
import useEarn from "hooks/useEarn";
import { EarnCardGrid } from "./EarnCardGrid"
import { EarnTable } from "./EarnTable"

export const EarnData = () => {

  const {displayMode} = useEarn();
  const mobile = useMobile();
  console.log(displayMode)
  return (
    <div>
      {!!mobile || displayMode === 'card' ? (
          <EarnCardGrid />
        ) : (
          <EarnTable />
        )}
    </div>
  )
}
