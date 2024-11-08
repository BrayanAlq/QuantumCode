import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { createJournal, fetchJournals } from '../services/journal';

export const useJournal = () => {
  const [token, setToken] = useState(null);
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('authToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          setError('Token no encontrado');
        }
      } catch (err) {
        setError('Error al obtener el token');
        console.error('Error al obtener el token:', err);
      }
    };

    fetchToken();
  }, []);

  // Función para obtener todos los journals
  const getJournals = async () => {
    if (!token) {
      setError('No se ha encontrado el token de autenticación');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const journalsData = await fetchJournals(token);
      setJournals(journalsData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al obtener los journals');
      console.error('Error al obtener journals:', err);
    }
  };

  useEffect(() => {
    if (token) {
      getJournals();
    }
  }, [token]);

  // Función para crear un nuevo journal
  const createNewJournal = async (description, date) => {
    if (!token) {
      setError('No se ha encontrado el token de autenticación');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const journalData = await createJournal(description, date, token);
      setLoading(false);
      return journalData;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al crear el diario');
      console.error('Error al crear diario:', err);
    }
  };

  return {
    token,
    journals,
    createNewJournal,
    getJournals,
    loading,
    error,
  };
};
