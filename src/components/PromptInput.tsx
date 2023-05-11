import {
  Button,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { KeyboardEventHandler } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";

type Props = {
  word: string;
  setWord: (word: string) => void;
  isDisabled: boolean;
  onSubmit: () => void;
};

export function PromptInput({ word, setWord, isDisabled, onSubmit }: Props) {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <VStack align="left" mb="8">
      {/* <HStack align="baseline">
        <FormLabel>Hanzi</FormLabel>
      </HStack> */}

      <HStack>
        <Button
          type="submit"
          colorScheme="blue"
          minW="unset"
          display="inline-block"
          width="8em"
          isDisabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Find
        </Button>

        <Input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          onKeyDown={handleKeyDown}
          isRequired={true}
          size="lg"
        />

        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Info"
              icon={<MdOutlineHelpOutline />}
              background="none"
              colorScheme="gray"
              color="gray.500"
              css={{ position: "relative", top: "-10px" }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>What you can enter</PopoverHeader>
            <PopoverBody>
              Enter a Hanzi character or word, to see a list of meanings,
              examples, and generated menomnics. You may also enter the pinyin
              for a single character, to see a list of matching characters.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </VStack>
  );
}
