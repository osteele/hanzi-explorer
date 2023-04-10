import { ArrowLeftIcon, ArrowRightIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Alert,
  HStack,
  Heading,
  IconButton,
  ListItem,
  OrderedList,
  Skeleton,
  Spinner,
  Tag,
  TagLeftIcon,
  Text,
  Tooltip,
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
          {isOrderedList(content) ? (
            <OrderedList pl="5">
              {getMarkdownListItems(content).map((item) => (
                <ListItem>{item}</ListItem>
              ))}
            </OrderedList>
          ) : isUnorderedList(content) ? (
            <UnorderedList pl="5">
              {getMarkdownListItems(content).map((item) => (
                <ListItem>{item}</ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Text>{content}</Text>
          )}
        </VStack>
      ))}
    </>
  );

  return (
    <VStack align="left">
      {listItemHeader()}
      {completion.length > 0 ? (
        completion
          .split(/\n+/)
          .map((text, i) => <Text style={{ marginBottom: 2 }}>{text}</Text>)
      ) : (
        <Skeleton />
      )}
      {requestInProgress && <Spinner size="xl" />}
    </VStack>
  );

  function listItemHeader() {
    return (
      <HStack>
        {title && (
          <h2
            style={{
              fontSize: "large",
              color: "#444",
              display: "inline-block",
            }}
          >
            title
          </h2>
        )}
        {/* <Tooltip
          label="Replace prompt by result"
          style={{ verticalAlign: "top", border: "1px solid red" }}
        >
          <IconButton
            aria-label="Replace prompt by result"
            variant="outline"
            icon={<ArrowUpIcon />}
            onClick={() => setPrompt(getResultText())}
          />
        </Tooltip> */}
        <Tooltip label="Copy result">
          <IconButton
            aria-label="Copy result"
            variant="outline"
            icon={<CopyIcon />}
            onClick={() => navigator.clipboard.writeText(completion)}
          />
        </Tooltip>
      </HStack>
    );
  }
}
