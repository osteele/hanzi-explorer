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
  const preparedModelParameters = isChatModel
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
  if (process.env.DEBUG) {
    console.debug("requesting", prompt);
  }
  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      stream: true,
      ...renameModelParameterNames(preparedModelParameters),
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

/**
 * Renames keys in an object according to specified rules.
 *
 * @param parameters - The object whose keys should be renamed.
 * @returns A new object with renamed keys based on the original keys and values from the input object.
 *
 * @example
 * const parameters = { maxResults: 10, pageToken: "abc123", numResults: 5 };
 * const renamedParams = renameModelParameterNames(parameters);
 * // renamedParams == { max_results: 10, page_token: "abc123", n: 5 }
 */
function renameModelParameterNames(parameters: { [key: string]: any }): {
  [key: string]: any;
} {
  const result: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(parameters)) {
    if (key === "numResults") {
      result["n"] = value;
    } else {
      const snakeCase = key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      result[snakeCase] = value;
    }
  }

  return result;
}
