import { Flex } from "@chakra-ui/react";
import "./App.css";
import { Providers } from "./Providers";
import HanziDetailsComponent from "./components/HanziDetailsComponent";
import { Header } from "./components/Header";

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
          <HanziDetailsComponent />
        </Flex>
      </div>
    </Providers>
  );
}

export default App;
