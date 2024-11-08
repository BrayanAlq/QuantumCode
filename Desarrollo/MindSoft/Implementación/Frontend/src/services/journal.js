import { API_URL } from '@env';

export const createJournal = async (description, date, token) => {
  try {
    const response = await fetch(`${API_URL}/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: description,
        date: date,  // Formato YYYY-MM-DD
      }),
    });

    // Si la respuesta no es satisfactoria, lanzamos un error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'No se pudo crear el diario');
    }

    // Si la solicitud es exitosa, procesamos los datos
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al crear el diario:', error.message);
    throw new Error(error.message || 'Hubo un problema al crear el diario'); // Lanzamos el error para que sea manejado por el frontend
  }
};

// Función para obtener los journals
export const fetchJournals = async (token) => {
    try {
      const response = await fetch(`${API_URL}/journal`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Si la respuesta no es satisfactoria, lanzamos un error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'No se pudieron obtener los journals');
      }
  
      // Si la solicitud es exitosa, procesamos los datos
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error al obtener los journals:', error.message);
      throw new Error(error.message || 'Hubo un problema al obtener los journals');
    }
};
