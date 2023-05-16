import { camelToSnakeCase } from "./utils";

describe("camelToSnakeCase", () => {
  it("should convert camelCase string to snake_case", () => {
    expect(camelToSnakeCase("helloWorld")).toEqual("hello_world");
    expect(camelToSnakeCase("thisIsCamelCasing")).toEqual(
      "this_is_camel_casing"
    );
    expect(camelToSnakeCase("anExampleString")).toEqual("an_example_string");
  });

  it("should return empty string if input string is empty", () => {
    expect(camelToSnakeCase("")).toEqual("");
  });

  it("should not modify string with no uppercase letters", () => {
    expect(camelToSnakeCase("hello")).toEqual("hello");
    expect(camelToSnakeCase("world")).toEqual("world");
  });

  it("should handle consecutive uppercase letters correctly", () => {
    expect(camelToSnakeCase("camelCaseABC")).toEqual("camel_case_abc");
  });
});
