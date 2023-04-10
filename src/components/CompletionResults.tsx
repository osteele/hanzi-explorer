import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  HStack,
  IconButton,
  Skeleton,
  Spinner,
  Tag,
  TagLeftIcon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
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
    {requestInProgress && !completions && (
      <>
        <Spinner size="xl" />
        <Skeleton />
      </>
    )}
    {completions && (
      <VStack align="left">
        {completions.map(({ prompt, completion, tags, isChat }, index) =>
          CompletionListItem({
            prompt,
            completion,
            tags,
            isChat,
            title: completions.length > 1 ? `Result #${index + 1}` : undefined,
            requestInProgress,
            setPrompt,
          })
        )}
      </VStack>
    )}
  </>
);

type CompletionListItemProps = {
  title?: string;
  prompt: string;
  completion: string;
  isChat: boolean;
  tags?: string[];
  requestInProgress: boolean;
  setPrompt: (prompt: string) => void;
};

function CompletionListItem({
  title,
  prompt,
  completion,
  tags,
  isChat,
  requestInProgress,
  setPrompt,
}: CompletionListItemProps) {
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
            onClick={() => navigator.clipboard.writeText(prompt + completion)}
          />
        </Tooltip>
        {tags &&
          tags.map((name) => (
            <Tag variant="solid" colorScheme="teal">
              {name === "settings #1" && (
                <TagLeftIcon boxSize="12px" as={ArrowLeftIcon} />
              )}
              {name}
              {name === "settings #2" && (
                <TagLeftIcon boxSize="12px" as={ArrowRightIcon} />
              )}
            </Tag>
          ))}
      </HStack>
    );
  }

  function getResultText(): string {
    return [prompt, completion].join(isChat ? "\n" : "");
  }
}
