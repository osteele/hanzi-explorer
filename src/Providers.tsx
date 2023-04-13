import { ChakraProvider } from "@chakra-ui/react";
import { APIKeyProvider } from "./APIKeyContext";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <APIKeyProvider>{children}</APIKeyProvider>
    </ChakraProvider>
  );
}
