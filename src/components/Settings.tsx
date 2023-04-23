import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FiSettings } from "react-icons/fi";
import { SettingsContext } from "../SettingsContext";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { interests, saveInterests } = useContext(SettingsContext)!;
  const btnRef = React.useRef(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<FiSettings />}
        aria-label="Settings"
        onClick={onOpen}
        bg="transparent"
      />
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
          <DrawerHeader>Interests</DrawerHeader>

          <DrawerBody>
            <Input
              type="text"
              placeholder="Enter your interests, e.g.: cooking, travel"
              value={interests.join(", ")}
              onChange={(event) =>
                saveInterests(
                  event.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              pr="4.5rem"
            />
          </DrawerBody>

          <DrawerFooter>
            <Button mr={3}>Clear</Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Settings;
