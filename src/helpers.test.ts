import { getHanziCount, isHanzi, isPinyin } from "./helpers";

describe("isPinyin", () => {
  test("should return true for valid pinyin", () => {
    expect(isPinyin("ni hao")).toBe(true);
  });

  test("should return true for valid pinyin with tone numbers", () => {
    expect(isPinyin("ni3hao3")).toBe(true);
  });

  test("should return true for valid pinyin with tone marks", () => {
    expect(isPinyin("nǐhǎo")).toBe(true);
  });

  test("should return false for invalid pinyin", () => {
    expect(isPinyin("niv hao")).toBe(false);
    expect(isPinyin("nihao6")).toBe(false);
  });
});

describe("isHanzi", () => {
  test("should return true for valid Hanzi", () => {
    expect(isHanzi("你好")).toBe(true);
  });

  test("should return false for non-Hanzi", () => {
    expect(isHanzi("ni hao")).toBe(false);
  });
});

describe("getHanziCount", () => {
  test("should return the correct number of Hanzi in a single character", () => {
    expect(getHanziCount("汉")).toBe(1);
  });

  test("should return the correct number of Hanzi in a word", () => {
    expect(getHanziCount("汉字")).toBe(2);
  });

  test("should return the correct number of Hanzi in a sentence", () => {
    expect(getHanziCount("你好，世界！")).toBe(4);
  });

  test("should return 0 for non-Hanzi string", () => {
    expect(getHanziCount("hello world")).toBe(0);
  });
});
