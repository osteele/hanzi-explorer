import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Switch,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

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
  return (
    <VStack align="left" mb="8">
      {/* <HStack align="baseline">
        <FormLabel>Hanzi</FormLabel>
      </HStack> */}

      <Box
        fontSize="sm"
        color="gray.500"
        display={{ base: "none", lg: "block" }}
      >
        Enter a Hanzi character or word, or pinyin for a single character.
      </Box>

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

        <Input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          isRequired={true}
          size="lg"
        />
      </HStack>
    </VStack>
  );
}
