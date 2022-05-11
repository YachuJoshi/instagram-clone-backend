module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.test.{js,ts}",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "<rootDir>/.*\\.system\\.test\\.ts$",
  ],
  globals: {
    "ts-jest": {
      diagnostics: { warnOnly: true },
    },
  },
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["./src/__test__/setup.ts"],
};
