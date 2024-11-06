import { useState } from 'react';
import { checkMoodRating } from '../services/checkDailyRating';

export const useCheckDailyRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);  // Inicializa el estado de status

  const checkMood = async (token) => {
    if (status) return;  // Si ya hay un status, no hace la solicitud

    setLoading(true);
    setError(null);

    try {
      const response = await checkMoodRating(token);

      if (response.error) {
        throw new Error(response.error);
      }

      setStatus(response.status);  // Actualiza el estado de status
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkMood,
    loading,
    error,
    status,
  };
};