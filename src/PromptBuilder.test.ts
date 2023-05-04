import { PromptBuilder } from "./PromptBuilder";
import { PromptTemplate } from "./PromptTemplate";

describe("PromptBuilder", () => {
  it("should flatten arrays, Promises, functions and PromptTemplates recursively", async () => {
    const promptBuilder = new PromptBuilder([
      "What is your name?",
      ["Hello,", () => "World!"],
      Promise.resolve("How are you doing?"),
      new PromptTemplate("I am doing {status}", ["status"]),
    ]);
    const formattedPrompts = await promptBuilder.format({ status: "great" });
    expect(formattedPrompts).toEqual([
      "What is your name?",
      "Hello,",
      "World!",
      "How are you doing?",
      "I am doing great",
    ]);
  });

  it("should work with nested arrays, functions, Promises and PromptTemplates", async () => {
    const promptBuilder = new PromptBuilder([
      "What is your name?",
      [
        "I am",
        Promise.resolve(() => "John"),
        ["Smith", new PromptTemplate("{middleInitial} Doe", ["middleInitial"])],
      ],
      "Nice to meet you!",
    ]);
    const formattedPrompts = await promptBuilder.format({
      middleInitial: "Q.",
    });
    expect(formattedPrompts).toEqual([
      "What is your name?",
      "I am",
      "John",
      "Smith",
      "Q. Doe",
      "Nice to meet you!",
    ]);
  });

  it("should return an empty array if no items are provided", async () => {
    const promptBuilder = new PromptBuilder([]);
    const formattedPrompts = await promptBuilder.format({});
    expect(formattedPrompts).toEqual([]);
  });

  it("should keep non-iterable items", async () => {
    const promptBuilder = new PromptBuilder([
      "What is the answer to the ultimate question of life, the universe, and everything?",
      "42",
    ]);
    const formattedPrompts = await promptBuilder.format({});
    expect(formattedPrompts).toEqual([
      "What is the answer to the ultimate question of life, the universe, and everything?",
      "42",
    ]);
  });

  it("should handle Promises that resolve to non-iterable items", async () => {
    const promptBuilder = new PromptBuilder([Promise.resolve("42")]);
    const formattedPrompts = await promptBuilder.format({});
    expect(formattedPrompts).toEqual(["42"]);
  });
});
