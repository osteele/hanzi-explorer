/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["dist"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
