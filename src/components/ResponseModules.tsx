import {
  Alert,
  Heading,
  ListItem,
  OrderedList,
  SkeletonText,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import {
  getMarkdownListItems,
  isOrderedList,
  isUnorderedList,
  splitMarkdownSections,
} from "../markdown";
import { Completions } from "../openAIClient";
import TextToSpeech from "./TextToSpeech";

type Props = {
  requestInProgress: boolean;
  error: {
    message: string;
  } | null;
  completions: Completions | null;
  setPrompt: (prompt: string) => void;
};

export function ResponseModules(props: Props) {
  const { completions, error, setPrompt, requestInProgress } = props;
  return (
    <>
      {error && <Alert status="error">{error.message}</Alert>}
      {completions && (
        <VStack align="left">
          {completions.map(({ completion }, index) =>
            CompletionListItem({
              completion,
              requestInProgress,
              setPrompt,
            })
          )}
        </VStack>
      )}
      <SkeletonText isLoaded={!requestInProgress} />
    </>
  );
}

type CompletionListItemProps = {
  completion: string;
  requestInProgress: boolean;
  setPrompt: (prompt: string) => void;
};

function CompletionListItem(props: CompletionListItemProps) {
  const { completion, requestInProgress, setPrompt } = props;
  const sections = splitMarkdownSections(completion);
  return (
    <>
      {sections.map(({ title, content }) => (
        <VStack align="left">
          {title && (
            <Heading as="h2" size="md" bg="brand.100">
              {title}
            </Heading>
          )}
          <ListItemContent content={content} />
        </VStack>
      ))}
    </>
  );
}

function ListItemContent({ content }: { content: string }) {
  const isOrdered = isOrderedList(content);
  const isUnordered = isUnorderedList(content);
  const isList = isOrdered || isUnordered;
  const items = isList
    ? getMarkdownListItems(content).map((item) => insertTextToSpeech(item))
    : [insertTextToSpeech(content)];
  const listItems = items.map((item) => <ListItem>{item}</ListItem>);
  return items.length === 1 ? (
    <Text>{items[0]}</Text>
  ) : isOrdered ? (
    <OrderedList pl="5">{listItems}</OrderedList>
  ) : (
    <UnorderedList pl="5">{listItems}</UnorderedList>
  );
}

const hanziSentencePattern =
  /([\u4e00-\u9fa5][\u4e00-\u9fa5。，！？：；（）《》]*)/;

function insertTextToSpeech(text: string) {
  return text
    .split(hanziSentencePattern)
    .map((s) =>
      hanziSentencePattern.test(s) ? (
        <TextToSpeech text={s} />
      ) : (
        <span>{s}</span>
      )
    );
}
