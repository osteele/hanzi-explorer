import { identifyInputType } from "./prompts";

describe("identifyWordType", () => {
  test("should identify pinyin", () => {
    expect(identifyInputType("ni hao")).toBe("pinyin");
  });

  test("should return true for Hanzi characters", () => {
    expect(identifyInputType("好")).toBe("hanzi");
  });

  test("should return true for Hanzi words", () => {
    expect(identifyInputType("你好")).toBe("hanzi");
  });

  test("should return null for everything else", () => {
    expect(identifyInputType("hello")).toBe(null);
  });
});
