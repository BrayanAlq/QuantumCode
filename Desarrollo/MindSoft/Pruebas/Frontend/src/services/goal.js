import { API_URL } from '@env'

export const fetchGoals = async (token) => {
  try {
    const response = await fetch(`${API_URL}/goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching goals');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const createGoal = async (goalData, token) => {
  try {
    const response = await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(goalData)
    });

    if (!response.ok) {
      throw new Error('Error creating goal');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};
