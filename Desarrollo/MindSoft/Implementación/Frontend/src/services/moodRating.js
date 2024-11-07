import { API_URL } from '@env';

export const createMoodRating = async (moodRating, token) => {
  try {
    const response = await fetch(`${API_URL}/mood-rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: moodRating.date, 
        mood_detail: moodRating.mood_detail, 
      }),
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