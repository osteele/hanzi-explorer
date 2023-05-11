import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";
import { SettingsContext } from "../SettingsContext";
import { getInputInfo } from "../getInputInfo";
import { Completions } from "../openAIClient";
import { PromptInput } from "./PromptInput";
import { ResponseModules } from "./ResponseModules";

function MainScreen() {
  const { apiKey } = useContext(APIKeyContext)!;
  const { interests } = useContext(SettingsContext)!;
  const [input, setInput] = useState("");

  const [completions, setCompletions] = useState<Completions | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handleSubmit = async () => {
    try {
      setRequestInProgress(true);
      await getInputInfo({
        input,
        apiKey,
        interests,
        setError,
        setCompletions,
      });
    } catch (error: any) {
      console.error(error);
      const message = error?.message ?? "An error occurred during the request.";
      setError({ message });
    } finally {
      setRequestInProgress(false);
    }
  };

  return (
    <Box padding="10px">
      <PromptInput
        onSubmit={handleSubmit}
        isDisabled={!apiKey || requestInProgress || input.trim().length === 0}
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
