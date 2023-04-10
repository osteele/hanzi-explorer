import { identifyWordType } from "./prompts";

describe("identifyWordType", () => {
  test("should identify pinyin", () => {
    expect(identifyWordType("ni hao")).toBe("pinyin");
  });

  test("should return true for Hanzi characters", () => {
    expect(identifyWordType("好")).toBe("hanzi");
  });

  test("should return true for Hanzi words", () => {
    expect(identifyWordType("你好")).toBe("hanzi");
  });

  test("should return null for everything else", () => {
    expect(identifyWordType("hello")).toBe(null);
  });
});
