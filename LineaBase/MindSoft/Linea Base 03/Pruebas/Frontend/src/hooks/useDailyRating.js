import { useState } from 'react';
import { createDailyRating, getDailyRatings } from '../services/dailyRating';

export const useDailyRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dailyRatings, setDailyRatings] = useState([]);

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

  // Función para obtener las calificaciones diarias
  const fetchDailyRatings = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getDailyRatings(token);  // Llamada al servicio

      if (response.error) {
        throw new Error(response.error);
      }

      setDailyRatings(response);  // Actualiza el estado con los datos
      return response;  // Asegúrate de retornar la respuesta aquí
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  return {
    submitDailyRating,
    fetchDailyRatings,
    dailyRatings,
    loading,
    error,
  };
};
