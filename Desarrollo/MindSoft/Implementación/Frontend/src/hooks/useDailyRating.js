import { useState } from 'react';
import { createDailyRating } from '../services/dailyRating';

export const useDailyRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitDailyRating = async (rating, date, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createDailyRating(rating, date, token);

      if (response.error) {
        throw new Error(response.error);
      }

      return response; // Devuelve la respuesta si es exitosa
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitDailyRating,
    loading,
    error,
  };
};
