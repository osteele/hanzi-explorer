import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";

const APIKeyForm = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { apiKey, apiKeyIsValid, saveApiKey } = useContext(APIKeyContext)!;
  const btnRef = React.useRef(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        API Key
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Enter your OpenAI API Key</DrawerHeader>

          <DrawerBody>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey ?? ""}
              onChange={(event) => saveApiKey(event.target.value.trim())}
              pr="4.5rem"
            />
            {apiKeyIsValid ? (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>The API key has been set.</AlertTitle>
              </Alert>
            ) : apiKey ? (
              <Alert status="warning">
                <AlertIcon />
                <AlertTitle>
                  The API key does not have the correct format.
                </AlertTitle>
              </Alert>
            ) : (
              <Alert status="info">
                <AlertIcon />
                <AlertTitle>The API key is not set.</AlertTitle>
                <AlertDescription>
                  You can obtain an API key from the OpenAI website.{" "}
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>{" "}
                  to get an API key. Once you have an API key, enter it below
                  and it will be stored on your computer.
                </AlertDescription>
              </Alert>
            )}
            <Text>
              The API key is stored on your computer. It will not be sent to any
              server except the OpenAI API server.
            </Text>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
              isDisabled={Boolean(apiKey?.match(/^\s*$/))}
              mr={3}
              onClick={() => saveApiKey("")}
            >
              Clear
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default APIKeyForm;
