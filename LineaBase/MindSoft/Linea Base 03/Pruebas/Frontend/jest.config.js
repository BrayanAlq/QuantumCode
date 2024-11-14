module.exports = {
  preset: 'jest-expo',  // Usa jest-expo para manejar la configuración de Expo automáticamente
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',  // Extiende expect con los matchers de testing-library
    './jest.setup.js',  // Configuración adicional en jest.setup.js
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@expo|expo-font|expo-asset|@expo/vector-icons|expo-modules-core)/", // Asegura que se transformen los módulos de Expo y React Native
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",  // Usa babel-jest para transformar archivos JS/JSX/TS/TSX
  },
};
