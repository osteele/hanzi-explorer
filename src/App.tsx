import { Flex } from "@chakra-ui/react";
import "./App.css";
import { Providers } from "./Providers";
import { Header } from "./components/Header";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <Providers>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "gold",
        }}
      >
        <Flex
          direction="column"
          h="100vh"
          background="white"
          css={{
            maxWidth: "calc(min(1000px,100vw))",
          }}
        >
          <Header />
          <MainScreen />
        </Flex>
      </div>
    </Providers>
  );
}

export default App;
