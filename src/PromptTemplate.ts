import { PromiseOrValue } from "./utils";

/**
 * Represents a template that can be formatted with variable values.
 */
export class PromptTemplate {
  /**
   * An array of variables found in the template.
   */
  public variables: string[];

  /**
   * Constructs a new prompt template with the given template string and optional array of variables.
   * If no variables are provided, it will find all variables in the template.
   *
   * @param template The template string.
   * @param variables (Optional) An array of variables.
   */
  constructor(public template: string, variables?: string[]) {
    const computedVariableSet = PromptTemplate.findVariables(template);
    this.variables = variables || Array.from(computedVariableSet);

    // Check for missing variables
    const variableSet = new Set(this.variables);
    const missingVariables = [...computedVariableSet].filter(
      (variable) => !variableSet.has(variable)
    );
    if (missingVariables.length > 0) {
      console.warn(
        `PromptTemplate: The template ${JSON.stringify(
          template
        )} contains variables ${JSON.stringify(
          missingVariables
        )} that are not in the variables array ${JSON.stringify(
          this.variables
        )}.`
      );
    }

    // Check for extra variables
    const extraVariables = [...variableSet].filter(
      (variable) => !computedVariableSet.has(variable)
    );
    if (extraVariables.length > 0) {
      console.warn(
        `PromptTemplate: The template ${JSON.stringify(
          template
        )} does not contain variables ${JSON.stringify(
          extraVariables
        )} that are in the variables array ${JSON.stringify(this.variables)}.`
      );
    }
  }

  /**
   * Finds all variables in the given template string.
   *
   * @param template The template string to search for variables in.
   * @returns An array of variables.
   */
  static findVariables(template: string): Set<string> {
    const variables = new Set<string>();
    for (const match of template.matchAll(/{(\w+)}/g)) {
      variables.add(match[1]);
    }
    return variables;
  }

  /**
   * Formats the template with the given variable values and returns the result as a promise.
   *
   * @param variables A record of variable names and their corresponding values.
   * @returns A promise that resolves to the formatted template.
   * @throws Error if a variable is undefined or null in the given record.
   */
  public async format(
    variables: Record<string, PromiseOrValue<string>>
  ): Promise<string> {
    const _this = this;
    let prompt = this.template;
    for (const name of this.variables) {
      prompt = prompt.replace(
        new RegExp(`{${name}}`, "g"),
        await resolve(name)
      );
    }
    return prompt;

    /**
     * Resolves the value of a variable using the given record of variable values.
     *
     * @param name The name of the variable to resolve.
     * @returns A promise that resolves to the value of the variable.
     * @throws Error if the variable is undefined or null in the given record.
     */
    async function resolve(name: string): Promise<string> {
      const value = await Promise.resolve(variables[name]);
      if (value === undefined || value === null) {
        throw new Error(`Variable ${name} is undefined in ${_this.toString()}`);
      }
      return value;
    }
  }

  /**
   * Returns a string representation of this prompt template.
   *
   * @returns A string representation of this prompt template.
   */
  public toString() {
    return `PromptTemplate{${JSON.stringify(this.template)}}`;
  }
}
