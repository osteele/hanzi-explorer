import {
  decompositionTemplateStrings,
  getCharacterDecomposition,
} from "./getCharacterDecomposition";
import { getCompletions } from "./openAIClient";
import {
  PromptTemplate,
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

export async function getInputInfo({
  input,
  apiKey,
  interests,
  setCompletions,
  setError,
}: {
  input: string;
  apiKey: string | null;
  interests: string[];
  setError: (error: { message: string } | null) => void;
  setCompletions: (completions: any[] | null) => void;
}) {
  input = input.replace(/\s+|\./g, "").trim();
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

  let composition = "";
  if (wordType === "hanzi") {
    const compositionData = await getCharacterDecomposition(input);
    if (compositionData) {
      const { leftComponent, rightComponent, decompositionType } =
        compositionData;
      composition =
        "The character is " +
        new PromptTemplate(decompositionTemplateStrings[decompositionType], [
          "first",
          "second",
        ]).format({ first: leftComponent, second: rightComponent });
    }
  }
  const template = chooseTemplate(input, wordType);
  const interestsPrompt = interests.length
    ? interestsTemplate.format({ interests: interests.join(", ") })
    : "";
  const prompt = Array.isArray(template)
    ? template.map((t) =>
        t.format({ word: input, composition, interestsPrompt })
      )
    : template.format({
        word: input,
        composition,
        interestsPrompt,
      });

  try {
    setCompletions(null);
    setError(null);
    const response = await getCompletions({
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
    setError({ message });
  }
}
