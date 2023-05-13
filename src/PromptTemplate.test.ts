import { PromptTemplate } from "./PromptTemplate";

describe("PromptTemplate", () => {
  const templateString = "Hello {name}, how are you feeling this {dayTime}?";
  const expectedVariables = ["name", "dayTime"];
  const promptTemplate = new PromptTemplate(templateString);

  it("should correctly initialize variables", () => {
    expect(promptTemplate.variables).toEqual(expectedVariables);
  });

  it("should correctly find variables in the template", () => {
    const foundVars = PromptTemplate.findVariables(templateString);
    expect(foundVars).toEqual(new Set(expectedVariables));
  });

  it("should correctly format a template with given variables", async () => {
    const variables = { name: "World", dayTime: "afternoon" };
    const expectedFormattedPrompt =
      "Hello World, how are you feeling this afternoon?";
    const formattedPrompt = await promptTemplate.format(variables);
    expect(formattedPrompt).toEqual(expectedFormattedPrompt);
  });

  it("should correctly format a template with Promise-valued variables", async () => {
    const variables = {
      name: new Promise<string>((resolve) => resolve("World")),
      dayTime: "afternoon",
    };
    const expectedFormattedPrompt =
      "Hello World, how are you feeling this afternoon?";
    const formattedPrompt = await promptTemplate.format(variables);
    expect(formattedPrompt).toEqual(expectedFormattedPrompt);
  });
});
