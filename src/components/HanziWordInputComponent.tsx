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
    <VStack align="left">
      {/* <HStack align="baseline">
        <FormLabel>Hanzi</FormLabel>
      </HStack> */}

      <Box
        fontSize="sm"
        color="gray.500"
        display={{ base: "none", lg: "block" }}
      >
        Enter a Mandarin or pinyin character or word.
      </Box>

      <Input
        value={word}
        onChange={(event) => setWord(event.target.value)}
        isRequired={true}
        size="lg"
      />

      <Button
        type="submit"
        colorScheme="blue"
        size="sm"
        isDisabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        Explain
      </Button>
    </VStack>
  );
}
