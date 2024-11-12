jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: 'Ionicons',
    FontAwesome: 'FontAwesome',
    MaterialIcons: 'MaterialIcons',
  };
});

jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simula que siempre cargan correctamente
}));

jest.mock('expo-modules-core', () => ({
  NativeModule: jest.fn(),
}));