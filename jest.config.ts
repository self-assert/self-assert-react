/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import { createDefaultPreset, TsConfigCompilerOptionsJson } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  testEnvironment: "jsdom",
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "50%",
  rootDir: ".",
  roots: ["<rootDir>/src"],
  slowTestThreshold: 2,
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  ...createDefaultPreset({
    tsconfig: {
      ...(compilerOptions as TsConfigCompilerOptionsJson),
      noEmit: true,
    },
  }),
  
};

export default config;
