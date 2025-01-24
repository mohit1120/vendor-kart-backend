module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  modulePathIgnorePatterns: ["dist"],
  testMatch: ["**/__tests__/**/*.test.(ts|js)"],
  testEnvironment: "node",
  moduleNameMapper: {
    "@utils/(.*)$": "<rootDir>/utils/$1",
    "@appV1/(.*)$": "<rootDir>/appV1/$1",
    "@config/(.*)$": "<rootDir>/config/$1",
    "@middleware/(.*)$": "<rootDir>/middleware/$1",
    "@post_processors/(.*)$": "<rootDir>/post_processors/$1",
    "@pre_processors/(.*)$": "<rootDir>/pre_processors/$1",
    "@db/(.*)$": "<rootDir>/db/$1",
  },
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["html"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while
  // executing the test
  collectCoverage: true,
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "src/*/*.routes.ts"],
  //   testResultsProcessor: "jest-sonar-reporter",
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
};
