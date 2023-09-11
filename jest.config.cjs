module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@testing-library/react$": "@testing-library/react",
  },
};
