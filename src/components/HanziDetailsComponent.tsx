import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";
import { SettingsContext } from "../SettingsContext";
import { Completions, getCompletions } from "../openAIClient";
import {
  chooseTemplate,
  identifyWordType,
  interestsTemplate,
} from "../prompts";
import { CompletionResults as CompletionsComponent } from "./CompletionResults";
import { HanziWordInputComponent } from "./HanziWordInputComponent";

const DefaultParameters = {
  model: "gpt-3.5-turbo",
  maxTokens: 2048,
  temperature: 0.7,
  presencePenalty: 0,
  frequencyPenalty: 0,
  numResults: 1,
};

function HanziDetailsComponent() {
  const { apiKey } = useContext(APIKeyContext)!;
  const { interests } = useContext(SettingsContext)!;
  const [word, setWord] = useState("");

  const [completions, setCompletions] = useState<Completions | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handleSubmit = async () => {
    const cleanString = word.replace(/\s+|\./g, "").trim();
    const wordType = identifyWordType(word);
    if (!wordType) {
      setError({
        message: "Please enter a Mandarin character or word, or valid pinyin.",
      });
      return;
    }

    const template = chooseTemplate(word, wordType);
    const interestsPrompt = interests.length
      ? interestsTemplate.replaceAll("{{interests}}", interests.join(", "))
      : "";
    const prompt = template
      .replaceAll("{{word}}", cleanString)
      .replaceAll("{{interests}}", interestsPrompt);

    try {
      setCompletions(null);
      setError(null);
      setRequestInProgress(true);
      const response = await getCompletions({
        apiKey: apiKey!,
        ...DefaultParameters,
        prompt,
        onProgress: (choices) => setCompletions(choices),
      });
      setCompletions(response.data.choices);
    } catch (error: any) {
      const message =
        error?.message ?? "An error occurred during the OpenAI request";
      setError({ message });
    } finally {
      setRequestInProgress(false);
    }
  };

  return (
    <Box padding="10px">
      <HanziWordInputComponent
        onSubmit={handleSubmit}
        isDisabled={!apiKey || requestInProgress || word.trim().length === 0}
        word={word}
        setWord={setWord}
      />

      <CompletionsComponent
        completions={completions}
        error={error}
        requestInProgress={requestInProgress}
        setPrompt={setWord}
      />
    </Box>
  );
}

export default HanziDetailsComponent;
