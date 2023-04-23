import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { APIKeyContext } from "../APIKeyContext";
import { SettingsContext } from "../SettingsContext";
import { Completions, getCompletions } from "../openAIClient";
import {
  chooseTemplate,
  identifyInputType,
  interestsTemplate,
} from "../prompts";
import { PromptInput } from "./PromptInput";
import { ResponseModules } from "./ResponseModules";

const DefaultParameters = {
  model: "gpt-3.5-turbo",
  maxTokens: 2048,
  temperature: 0.7,
  presencePenalty: 0,
  frequencyPenalty: 0,
  numResults: 1,
};

function MainScreen() {
  const { apiKey } = useContext(APIKeyContext)!;
  const { interests } = useContext(SettingsContext)!;
  const [word, setWord] = useState("");

  const [completions, setCompletions] = useState<Completions | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handleSubmit = async () => {
    const cleanString = word.replace(/\s+|\./g, "").trim();
    const wordType = identifyInputType(word);
    if (!wordType) {
      setError({
        message: "Please enter a Mandarin character or word, or valid pinyin.",
      });
      return;
    }

    const template = chooseTemplate(word, wordType);
    const interestsPrompt = interests.length
      ? interestsTemplate.format({ interests: interests.join(", ") })
      : "";
    const prompt = Array.isArray(template)
      ? template.map((t) => t.format({ word: cleanString, interestsPrompt }))
      : template.format({
          word: cleanString,
          interestsPrompt,
        });

    try {
      setCompletions(null);
      setError(null);
      setRequestInProgress(true);
      const response = await getCompletions({
        apiKey: apiKey!,
        ...DefaultParameters,
        prompt,
        onProgress: (choices) => {
          // make a copy, so that React will notice that the state has changed
          setCompletions([...choices]);
        },
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
      <PromptInput
        onSubmit={handleSubmit}
        isDisabled={!apiKey || requestInProgress || word.trim().length === 0}
        word={word}
        setWord={setWord}
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
