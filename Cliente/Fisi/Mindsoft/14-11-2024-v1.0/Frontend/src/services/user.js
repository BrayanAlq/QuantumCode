import { API_URL } from '@env';

export const fetchUserInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}/user-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching user information');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};