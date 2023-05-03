export class PromptTemplate {
  public variables: string[];

  constructor(public template: string, variables?: string[]) {
    this.variables = variables || PromptTemplate.findVariables(template);
  }

  static findVariables(template: string) {
    const variables = new Set<string>();
    for (const match of template.matchAll(/{(\w+)}/g)) {
      variables.add(match[1]);
    }
    return Array.from(variables);
  }

  public async format(variables: Record<string, string>): Promise<string> {
    let prompt = this.template;
    for (const variable of this.variables) {
      prompt = prompt.replace(
        new RegExp(`{${variable}}`, "g"),
        variables[variable]
      );
    }
    return prompt;
  }
}
