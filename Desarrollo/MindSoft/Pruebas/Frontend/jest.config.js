module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@expo|expo-font|expo-asset)",
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
