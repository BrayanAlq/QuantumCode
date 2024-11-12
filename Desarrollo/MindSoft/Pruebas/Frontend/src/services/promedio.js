import { API_URL } from '@env'

export const fetchPromedio = async (token,dateStat) => {
  try {
    
    const response = await fetch(`${API_URL}/stats-rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({
        date:dateStat,
      }),

    });

    if (!response.ok) {
      throw new Error('Error fetching promedio');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};