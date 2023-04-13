import {
  Alert,
  Heading,
  ListItem,
  OrderedList,
  Skeleton,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { isHanzi } from "../helpers";
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

export const CompletionResults = ({
  completions,
  error,
  setPrompt,
  requestInProgress,
}: Props) => (
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
    {requestInProgress && (
      <>
        <Spinner size="xl" />
        <Skeleton />
      </>
    )}
  </>
);

type CompletionListItemProps = {
  completion: string;
  requestInProgress: boolean;
  setPrompt: (prompt: string) => void;
};

function CompletionListItem({
  completion,
  requestInProgress,
  setPrompt,
}: CompletionListItemProps) {
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

type ListItemContentProps = {
  content: string;
};

function ListItemContent({ content }: ListItemContentProps) {
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

function insertTextToSpeech(text: string) {
  return text
    .split(/([\u4e00-\u9fa5]+)/)
    .map((s) => (isHanzi(s) ? <TextToSpeech text={s} /> : <span>{s}</span>));
}
