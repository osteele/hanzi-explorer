import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";

type Props = {
  word: string;
  setWord: (word: string) => void;
  isDisabled: boolean;
  onSubmit: () => void;
};

export function HanziWordInputComponent({
  word,
  setWord,
  isDisabled,
  onSubmit,
}: Props) {
  const [showInfo, setShowInfo] = useState(false);
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
          Explain
        </Button>
        {/* <Icon as={FaInfo} onClick={() => setShowInfo(!showInfo)} /> */}
        <IconButton
          aria-label="Info"
          icon={<FaInfo />}
          onClick={() => setShowInfo(!showInfo)}
          size="sm"
          background="none"
          colorScheme="gray"
          color="gray.500"
          css={{ position: "relative", top: "-10px", left: "-10px" }}
        />

        <Input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          isRequired={true}
          size="lg"
        />
      </HStack>

      {showInfo && (
        <Box fontSize="sm" color="gray.500" lineHeight={1.2}>
          Enter a Hanzi character or word, to see a list of meanings, examples,
          and generated menomnics. You may also enter the pinyin for a single
          character, to see a list of matching characters.
        </Box>
      )}
    </VStack>
  );
}
