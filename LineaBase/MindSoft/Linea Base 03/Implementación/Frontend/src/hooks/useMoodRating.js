import { useState } from 'react';
import { createMoodRating } from '../services/moodRating'; 

export const useMoodRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitMoodRating = async (moodRating, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createMoodRating(moodRating, token);

      if (response.error) {
        throw new Error(response.error); 
      }

      return response; 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return {
    submitMoodRating, 
    loading,          
    error,           
  };
};