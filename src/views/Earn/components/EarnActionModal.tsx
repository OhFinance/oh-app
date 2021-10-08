import { Grid, Typography } from "@material-ui/core";
import { Button, Modal, ModalProps } from "@ohfinance/oh-ui";
import { TokenInput } from "components/TokenInput";
import { Bank } from "config/constants/types";
import { FC, useState } from "react";

interface EarnActionModalProps extends ModalProps {
  action: "Deposit" | "Withdraw";
  bank: Bank;
}

export const EarnActionModal: FC<EarnActionModalProps> = ({
  isOpen,
  onDismiss,
  action,
  bank,
}) => {
  const isDeposit = action === "Deposit";
  const title = `${action} ${bank.underlying.symbol}`;
  const [input, setInput] = useState("");

  return (
    <Modal title={title} isOpen={isOpen} onDismiss={onDismiss} fullWidth>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="h6" align="left">
                {isDeposit ? bank.underlying.symbol : bank.symbol} Balance
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6" align="right">
                0.000 {isDeposit ? bank.underlying.symbol : bank.symbol}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TokenInput
            placeholder={title}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onMax={() => setInput("1")}
          />
        </Grid>
        <Grid item>
          {/* <Button fullWidth variant="contained" color="primary">
            Approve
          </Button> */}
          <Button fullWidth variant="contained" color="primary">
            {action}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
