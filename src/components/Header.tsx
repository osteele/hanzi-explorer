import { Box, Flex, Heading } from "@chakra-ui/react";
import APIKeyForm from "./APIKeyForm";
import Settings from "./Settings";

export function Header() {
  return (
    <Flex
      direction="row"
      background="0 center / 100% url('/header-background.jpg')"
      backgroundSize="cover"
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
      <Settings />
    </Flex>
  );
}
