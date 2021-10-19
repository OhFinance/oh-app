import { Flex, Modal, ModalProps, Text } from "@ohfinance/oh-ui";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { FC } from "react";
import { useThemeManager } from "state/user/hooks";

export const SettingsModal: FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [isDarkMode, toggleDarkMode] = useThemeManager();

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
    </Modal>
  );
};
