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

function App() {
  return (
    <ChakraProvider>
      <APIKeyProvider>
        <Flex direction="column" h="100vh">
          <Flex direction="row" bgGradient="linear(to-r, red.600, red.200)">
            <Heading flex="1" as="h1" size="lg" color="white" p={4}>
              Hanzi Explorer
            </Heading>
            <Box textAlign="right" w="40" p={4}>
              <APIKeyForm />
            </Box>
          </Flex>
          <Box w="80%" p={4}>
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
