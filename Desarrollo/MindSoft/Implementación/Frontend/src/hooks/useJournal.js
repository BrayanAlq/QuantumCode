import { useState, useEffect } from 'react';
import { getJournals } from '../services/journal';

export const useJournal = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJournals = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getJournals();
      console.log("dataUse", data)
      setJournals(data);
    } catch (error) {
      console.error('Fetch error:', error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJournals();
  }, [])

  return {
    journals,
    loading,
    error,
    fetchJournals,
  }
};
