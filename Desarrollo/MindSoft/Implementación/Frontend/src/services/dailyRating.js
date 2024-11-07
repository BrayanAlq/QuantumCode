import { API_URL } from '@env';

export const createDailyRating = async (rating, date, token) => {
  try {
    const response = await fetch(`${API_URL}/user-daily_rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, date }),
    });

    if (!response.ok) {
      const errorJson = await response.json();
      throw new Error(errorJson.detail);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};
