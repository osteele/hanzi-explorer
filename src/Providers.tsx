import { ChakraProvider } from "@chakra-ui/react";
import { APIKeyProvider } from "./APIKeyContext";
import theme from "./theme";
import { SettingsProvider } from "./SettingsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <SettingsProvider>
        <APIKeyProvider>{children}</APIKeyProvider>
      </SettingsProvider>
    </ChakraProvider>
  );
}
