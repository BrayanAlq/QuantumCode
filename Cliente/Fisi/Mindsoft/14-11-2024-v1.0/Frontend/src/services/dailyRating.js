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

// Función para obtener las calificaciones diarias de un usuario
export const getDailyRatings = async (token) => {
  try {
    const response = await fetch(`${API_URL}/user-daily_rating`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorJson = await response.json();
      console.error("Error al obtener calificaciones diarias:", errorJson);  // Log para el error de respuesta
      throw new Error(errorJson.detail);
    }

    return await response.json();  // Retorna la respuesta correcta
  } catch (error) {
    console.error("Error en getDailyRatings:", error);  // Log para errores generales
    return { error: error.message };  // Devuelve el error
  }
};
