import { Flex, Modal, ModalProps, Text } from "@ohfinance/oh-ui";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { Tooltip, TooltipText } from "components/Tooltip";
import { FC } from "react";
import { useApprovalManager, useThemeManager } from "state/user/hooks";

export const SettingsModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [isDarkMode, toggleDarkMode] = useThemeManager();
  const [isExactApproval, toggleExactApproval] = useApprovalManager();

  return (
    <Modal
      title="Settings"
      isOpen={!!isOpen}
      onDismiss={onDismiss}
      maxWidth="sm"
      fullWidth
    >
      <Flex align="center" justify="space-between">
        <Text>Dark Mode</Text>
        <ThemeSwitcher checked={isDarkMode} onChange={toggleDarkMode} />
      </Flex>

      <Flex align="center" justify="space-between" mt={2}>
        <Flex>
          <Text>Use Exact Approvals</Text>
          <Flex ml={1} center>
            <Tooltip
              title={
                <TooltipText>
                  Approve Oh! Finance contracts to use the exact amount of
                  tokens required for the current transaction. Defaults to
                  infinite approval.
                </TooltipText>
              }
            />
          </Flex>
        </Flex>
        <ThemeSwitcher
          checked={isExactApproval}
          onChange={toggleExactApproval}
        />
      </Flex>
    </Modal>
  );
};
