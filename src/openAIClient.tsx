export type CompletionParameters = {
  model: string;
  prompt: string;
  frequencyPenalty: number;
  maxTokens: number;
  numResults: number;
  presencePenalty: number;
  temperature: number;
};

export type CompletionParameterSetters = {
  setPrompt: (prompt: string) => void;
  setModel: (model: string) => void;
  setFrequencyPenalty: (frequencyPenalty: number) => void;
  setMaxTokens: (maxTokens: number) => void;
  setNumResults: (numResults: number) => void;
  setPresencePenalty: (presencePenalty: number) => void;
  setTemperature: (temperature: number) => void;
};

export type Completions = {
  prompt: string;
  completion: string;
  isChat: boolean;
  tags?: string[];
}[];

export const CompletionModels = [
  { value: "text-davinci-003", label: "Davinci 3" },
  { value: "text-davinci-002", label: "Davinci 2" },
  { value: "text-curie-001", label: "Curie" },
  { value: "text-babbage-001", label: "Babbage" },
  { value: "text-ada-001", label: "Ada" },
];

export const ChatModels = [{ value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" }];

export type CompletionParameterName =
  | "model"
  | "prompt"
  | "numResults"
  | "maxTokens"
  | "temperature"
  | "frequencyPenalty"
  | "presencePenalty"
  | "topP";

export const ParameterDescriptions: {
  key: CompletionParameterName;
  label: string;
  description: string;
  min: number;
  max: number;
}[] = [
  {
    key: "numResults",
    label: "Number of Results",
    description: "The number of completions to generate for each prompt.",
    min: 1,
    max: 10,
  },
  {
    key: "maxTokens",
    label: "Max Tokens",
    description:
      "The maximum number of tokens to generate. There are about two tokens per word.",
    min: 100,
    max: 4096,
  },
  {
    key: "temperature",
    label: "Temperature",
    description:
      "The higher the temperature, the more random the completions. Try 0.9 for more creative applications and 0.02 for a more focused asnwer to a question with a well-defined answer.",
    min: 0,
    max: 2,
  },
  {
    key: "topP",
    label: "Top P",
    description:
      "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
    min: 0,
    max: 1,
  },
  {
    key: "presencePenalty",
    label: "Presence Penalty",
    description:
      "The higher the presence penalty, the more likely the model is to generate new tokens instead of repeating ones that have already been used at least once.",
    min: 0,
    max: 2,
  },
  {
    key: "frequencyPenalty",
    label: "Frequency Penalty",
    description:
      "The higher the frequency penalty, the more likely the model is to generate new tokens instead of repeating ones that have been frequently used.",
    min: 0,
    max: 2,
  },
];

export async function getCompletions({
  apiKey,
  onProgress,
  ...modelParameters
}: {
  apiKey: string;
  onProgress?: (choices: Completions) => void;
  prompt: string | string[];
  model: string;
  numResults: number;
  maxTokens: number;
  temperature: number;
  frequencyPenalty: number;
  presencePenalty: number;
  // topP: number;
}): Promise<{ data: { choices: Completions } }> {
  // if prompt is an array, apply streamingCompletion to each prompt
  const { numResults, prompt } = modelParameters;
  if (Array.isArray(prompt)) {
    const choices = Array.from({ length: numResults * prompt.length }, () => ({
      prompt: "",
      completion: "",
      isChat: false,
    }));
    await Promise.all(
      prompt.map((prompt, i) =>
        getCompletions({
          apiKey,
          ...modelParameters,
          prompt,
          onProgress: (choicesSlice) => {
            choices.splice(i * numResults, numResults, ...choicesSlice);
            onProgress?.(choices);
          },
        })
      )
    );
    return {
      data: {
        choices,
      },
    };
  }

  const isChatModel = modelParameters.model.startsWith("gpt-");
  const endpoint = isChatModel ? "chat/completions" : "completions";
  const alteredModelParameters = isChatModel
    ? {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        ...modelParameters,
        prompt: undefined,
      }
    : modelParameters;
  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      stream: true,
      ...renameModelParameterNames(alteredModelParameters),
    }),
  });
  if (response.status >= 400) {
    const text = await response.text();
    let e = new Error(text);
    try {
      const json = JSON.parse(text);
      e = json.error;
    } catch {}
    throw e;
  }
  const reader = response.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();
  if (!reader)
    throw new Error("Internal error: failed to create TextDecoderStream");
  const choices = Array.from({ length: numResults }, () => ({
    prompt,
    completion: "",
    isChat: isChatModel,
  }));
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (
      value.split("\n").some((line) => {
        if (line === "data: [DONE]") {
          return true;
        } else if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));
          for (const choice of data.choices) {
            const index = choice.index;
            choices[index].completion +=
              choice.text ?? choice.delta.content ?? "";
          }
          onProgress?.(choices);
        }
        return false;
      })
    ) {
      break;
    }
  }
  reader.releaseLock();
  return { data: { choices } };
}

export async function combineCompletions({
  apiKey,
  parameterSets,
}: {
  apiKey: string;
  parameterSets: (Omit<CompletionParameters, "prompt"> & {
    prompt: string | string[];
  })[];
}): Promise<{
  data: { choices: Completions };
}> {
  const responses = await Promise.all(
    parameterSets.map((parameters) => getCompletions({ apiKey, ...parameters }))
  );
  const choices = responses.flatMap((r, i) =>
    r.data.choices.map((c) => ({ ...c, tags: [`settings #${i + 1}`] }))
  );
  return { data: { choices } };
}

function renameModelParameterNames(parameters: { [key: string]: any }) {
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => [
      key === "numResults"
        ? "n"
        : key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
      value,
    ])
  );
}
