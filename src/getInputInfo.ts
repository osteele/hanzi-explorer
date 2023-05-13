import { useRef } from "react";
import { PromptTemplate } from "./PromptTemplate";
import {
  decompositionTemplateStrings,
  getCharacterDecomposition,
} from "./getCharacterDecomposition";
import { CompletionRequestManager } from "./openAIClient";
import {
  chooseTemplate,
  identifyInputType,
  interestsTemplate,
} from "./prompts";

const ModelParameters = {
  model: "gpt-3.5-turbo",
  maxTokens: 2048,
  temperature: 0.7,
  presencePenalty: 0,
  frequencyPenalty: 0,
  numResults: 1,
};

type GetInputInfoParams = {
  input: string;
  apiKey: string | null;
  interests: string[];
  setCompletions: (completions: any[] | null) => void;
  setError: (
    error: {
      message: string;
    } | null
  ) => void;
  completionRequestManager: CompletionRequestManager;
};

export async function getInputInfo(params: GetInputInfoParams) {
  const {
    input: untrimmedInput,
    apiKey,
    interests,
    setCompletions,
    setError,
    completionRequestManager,
  } = params;
  const input = untrimmedInput.replace(/\s+|\./g, "").trim();
  if (!apiKey) {
    setError({ message: "Please enter an API key" });
    return;
  }
  if (!input) {
    setError({ message: "Please enter a prompt" });
    return;
  }

  const wordType = identifyInputType(input);
  if (!wordType) {
    setError({
      message: "Please enter a Mandarin character or word, or valid pinyin.",
    });
    return;
  }

  const interestsPrompt = interests.length
    ? await interestsTemplate.format({ interests: interests.join(", ") })
    : "";
  const components =
    wordType === "hanzi" ? getCharacterDecompositionDescription(input) : "";
  const template = chooseTemplate(input, wordType, components);
  const prompt = Array.isArray(template)
    ? await Promise.all(
        template.map((t) =>
          t.format({ word: input, components, interestsPrompt })
        )
      )
    : await template.format({
        word: input,
        components,
        interestsPrompt,
      });

  try {
    setCompletions(null);
    setError(null);
    const response = await completionRequestManager.getCompletions({
      apiKey,
      ...ModelParameters,
      prompt,
      onProgress: (choices) => {
        // make a copy, so that React will notice that the state has changed
        setCompletions([...choices]);
      },
    });
    setCompletions(response.data.choices);
  } catch (error: any) {
    console.error(error);
    const message =
      error?.message ?? "An error occurred during the OpenAI request";
    setError(error?.message ? error : { message });
  }
}

async function getCharacterDecompositionDescription(
  character: string
): Promise<string> {
  const compositionData = await getCharacterDecomposition(character);
  if (compositionData) {
    const { leftComponent, rightComponent, decompositionType } =
      compositionData;
    return (
      "The character is " +
      (await new PromptTemplate(
        decompositionTemplateStrings[decompositionType],
        ["first", "second"]
      ).format({ first: leftComponent, second: rightComponent }))
    );
  } else {
    return "";
  }
}
