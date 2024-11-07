import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

export const checkMoodRating = async () => {
  try {
 
    const token = await SecureStore.getItemAsync('authToken');
    
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/check-daily-rating`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });


    if (response.status === 403) {
      const data = await response.json();
      return {
        allowed: false,
        message: data.detail.message,
      };
    }

    if (response.ok) {
      const data = await response.json();
      return {
        allowed: true,
        message: data.message,
      };
    }

    
    throw new Error('Unexpected error');
  } catch (error) {
    console.error('Error checking mood rating:', error);
    return {
      allowed: false,
      message: 'An error occurred. Please try again.',
    };
  }
};
  