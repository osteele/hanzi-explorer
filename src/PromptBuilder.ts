import { PromptTemplate } from "./PromptTemplate";
import { PromiseOrValue } from "./utils";

type PromptBuilderItemWithoutPromise =
  | string
  | PromptTemplate
  | (() => PromptBuilderItem)
  | PromptBuilderItem[];

type PromptBuilderItem =
  | string
  | PromptTemplate
  | (() => PromptBuilderItem)
  | Promise<PromptBuilderItemWithoutPromise>
  | PromptBuilderItem[];

export class PromptBuilder {
  constructor(public readonly items: PromptBuilderItem[]) {}

  public async format(
    variables: Record<string, PromiseOrValue<string>>
  ): Promise<string[]> {
    let items = this.items;
    // while any element is an array, a function, a Promise, or a
    // PromptTemplate, flatten the array, apply the function to the variables,
    // await the Promise, or format the PromptTemplate
    while (
      items.some(
        (e) =>
          Array.isArray(e) ||
          typeof e === "function" ||
          e instanceof Promise ||
          e instanceof PromptTemplate
      )
    ) {
      items = await Promise.all(
        items.map(async (e) => {
          if (Array.isArray(e)) {
            return e;
          } else if (typeof e === "function") {
            return await e();
          } else if (e instanceof Promise) {
            return await e;
          } else if (e instanceof PromptTemplate) {
            return await e.format(variables);
          } else {
            return e;
          }
        })
      ).then((e) => e.flat());
    }
    return items as any;
  }
}
