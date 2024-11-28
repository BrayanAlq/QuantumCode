import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';

export const login = async (email, password) => {
  try {
    const response = await fetch(
      `${API_URL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password
        })
      }
    )

    if (response.status === 401 || response.status === 404) {
      const errorJson = await response.json()
      throw new Error(errorJson.detail)
    }

    if (!response.ok) {
      throw new Error('Algo salió mal')
    } else {
      const responseJson = await response.json()
      return responseJson
    }
  } catch (error) {
    return { error: error.message }
  }
}

export const verifyTokenOnServer = async (token) => {
  try {
    const response = await fetch(
      `${API_URL}/verify-token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Token no válido')
    }

    return true
  } catch (error) {
    return { error: error.message }
  }
}

export const logout = async (navigation) => {
  await SecureStore.deleteItemAsync('authToken');
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  );
};