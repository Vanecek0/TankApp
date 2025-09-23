import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-router', () => ({
    Redirect: ({ href }) => <>{`Redirected to ${href}`}</>,
}));