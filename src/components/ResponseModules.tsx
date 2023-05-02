import { Alert, SkeletonText, VStack } from "@chakra-ui/react";
import { Completions } from "../openAIClient";
import { FacetDisplay } from "./FacetDisplay";

type Props = {
  requestInProgress: boolean;
  error: {
    message: string;
  } | null;
  completions: Completions | null;
};

export function ResponseModules(props: Props) {
  const { completions, error, requestInProgress } = props;
  return (
    <>
      {error && <Alert status="error">{error.message}</Alert>}
      {completions && (
        <VStack align="left">
          {completions.map(({ completion }, i) => (
            <FacetDisplay
              key={i}
              completion={completion}
              requestInProgress={requestInProgress}
            />
          ))}
        </VStack>
      )}
      <SkeletonText isLoaded={!requestInProgress} />
    </>
  );
}
