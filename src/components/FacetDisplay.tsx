import {
  Heading,
  ListItem,
  OrderedList,
  Skeleton,
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
import TextToSpeech from "./TextToSpeech";

type Props = {
  completion: string;
  requestInProgress: boolean;
};

export function FacetDisplay(props: Props) {
  const { completion, requestInProgress } = props;
  const sections = splitMarkdownSections(completion);
  return (
    <>
      {sections.map(({ title, content }, i) => (
        <VStack align="left">
          {title && (
            <Heading as="h2" size="md" bg="brand.100">
              {title}
            </Heading>
          )}
          <ListItemContent key={i} content={content} />
        </VStack>
      ))}
      <Skeleton isLoaded={!requestInProgress} />
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
