import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { APIKeyProvider } from "./APIKeyContext";
import "./App.css";
import APIKeyForm from "./components/APIKeyForm";
import APIKeyWarning from "./components/APIKeyWarning";
import HanziDetailsComponent from "./components/HanziDetailsComponent";
import { customTheme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <APIKeyProvider>
        <Flex direction="column" h="100vh">
          <Flex direction="row" bgGradient="linear(to-r, blue.600, gray.200)">
            <Heading
              flex="1"
              as="h1"
              size="lg"
              color="white"
              fontFamily="logotype"
              p={4}
            >
              Hanzi Explorer
            </Heading>
            <Box textAlign="right" w="40" p={4}>
              <APIKeyForm />
            </Box>
          </Flex>
          <Box>
            <APIKeyWarning />
            <Tabs isFitted variant="enclosed" defaultIndex={0}>
              <TabList>
                {/* <Tab>Components</Tab> */}
                {/* <Tab>Mnemonics</Tab> */}
                {/* <Tab>Synonyms</Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HanziDetailsComponent />
                </TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </APIKeyProvider>
    </ChakraProvider>
  );
}

export default App;
