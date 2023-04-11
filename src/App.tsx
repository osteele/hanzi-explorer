import { Box, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { APIKeyProvider } from "./APIKeyContext";
import "./App.css";
import APIKeyForm from "./components/APIKeyForm";
import HanziDetailsComponent from "./components/HanziDetailsComponent";
import { theme } from "./theme";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <APIKeyProvider>{children}</APIKeyProvider>
    </ChakraProvider>
  );
}

function Header() {
  return (
    <Flex
      direction="row"
      background="0 center / 100% url('/header-background.png')"
      // bgGradient="linear(to-r, blue.600, gray.200)"
      shadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
    >
      <Heading
        flex="1"
        as="h1"
        style={{ fontSize: "30pt" }}
        fontFamily="logotype"
        pl={4}
      >
        Hanzi Explorer
      </Heading>
      <Box textAlign="right" w="40" p={4} fontFamily="body">
        <APIKeyForm />
      </Box>
    </Flex>
  );
  k;
}

function App() {
  return (
    <Providers>
      <Flex direction="column" h="100vh">
        <Header />
        <HanziDetailsComponent />
      </Flex>
    </Providers>
  );
}

export default App;
