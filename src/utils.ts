export type PromiseOrValue<T> = Promise<T> | T;

// A utility function to convert a string from camelCase to snake_case.
export function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
