import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";
import { SettingsContext } from "../SettingsContext";
import { getInputInfo } from "../getInputInfo";
import { CompletionRequestManager, Completions } from "../openAIClient";
import { PromptInput } from "./PromptInput";
import { ResponseModules } from "./ResponseModules";

function MainScreen() {
  const { apiKey } = useContext(APIKeyContext)!;
  const { interests } = useContext(SettingsContext)!;
  const [input, setInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");

  const [completions, setCompletions] = useState<Completions | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const completionRequestManagerRef = useRef<CompletionRequestManager | null>(
    null
  );
  useEffect(() => {
    completionRequestManagerRef.current = new CompletionRequestManager();
  }, [apiKey]);
  const completionRequestManager = completionRequestManagerRef.current!;

  const handleSubmit = async () => {
    completionRequestManager.cancelAllPendingRequests();
    try {
      setRequestInProgress(true);
      setPreviousInput(input);
      await getInputInfo({
        input,
        apiKey,
        interests,
        setError,
        setCompletions,
        completionRequestManager,
      });
    } catch (error: any) {
      console.error(error);
      const message =
        error?.message ?? "An error occurred during the OpenAI request.";
      setError({ message });
    } finally {
      setRequestInProgress(false);
    }
  };

  const submitIsDisabled =
    !apiKey ||
    previousInput.trim() === input.trim() ||
    input.trim().length === 0;
  return (
    <Box padding="10px">
      <PromptInput
        onSubmit={handleSubmit}
        isDisabled={submitIsDisabled}
        word={input}
        setWord={setInput}
      />

      <ResponseModules
        completions={completions}
        error={error}
        requestInProgress={requestInProgress}
      />
    </Box>
  );
}

export default MainScreen;
