import { API_URL } from './constants';

export const checkMoodRating = async (token) => {
    try {
      const response = await fetch(`${API_URL}/check-daily-rating`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.detail || "Error desconocido");
      }
  
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  };
  