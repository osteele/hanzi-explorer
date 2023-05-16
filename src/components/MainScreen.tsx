import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";
import { SettingsContext } from "../SettingsContext";
import { getInputInfo } from "../getInputInfo";
import { Completions } from "../openAIClient";
import { PromptInput } from "./PromptInput";
import { ResponseModules } from "./ResponseModules";
import { useCompletionRequestManager } from "../completionRequestManager";

function MainScreen() {
  const { apiKey } = useContext(APIKeyContext)!;
  const { interests } = useContext(SettingsContext)!;
  const [input, setInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");

  const [completions, setCompletions] = useState<Completions | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const completionRequestManager = useCompletionRequestManager(apiKey);

  const handleSubmit = async () => {
    if (!completionRequestManager) {
      return;
    }
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
