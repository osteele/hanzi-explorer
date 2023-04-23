import { Alert, SkeletonText, VStack } from "@chakra-ui/react";
import { Completions } from "../openAIClient";
import { FacetDisplay } from "./FacetDisplay";

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
            FacetDisplay({
              completion,
              requestInProgress,
            })
          )}
        </VStack>
      )}
      <SkeletonText isLoaded={!requestInProgress} />
    </>
  );
}
