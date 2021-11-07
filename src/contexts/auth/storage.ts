import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ITokens {
  accessToken: string;
}
const TOKENS_KEY = '@auth_tokens';

export const storeTokens = async (tokens: ITokens) => {
  try {
    await AsyncStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } catch (error) {}
};

export const readTokens = async (): Promise<ITokens | undefined> => {
  try {
    const payload = await AsyncStorage.getItem(TOKENS_KEY);
    return payload ? JSON.parse(payload) : undefined;
  } catch (error) {
    return undefined;
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem(TOKENS_KEY);
  } catch (error) {}
};
