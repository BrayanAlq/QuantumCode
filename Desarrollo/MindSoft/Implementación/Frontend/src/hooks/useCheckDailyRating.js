import { useState, useEffect } from 'react';
import { checkMoodRating } from '../services/checkDailyRating';

const useMoodRating = () => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoodRatingStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkMoodRating();
      setStatus(result.allowed);
      setMessage(result.message);
    } catch (err) {
      console.error('Error in useMoodRating:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodRatingStatus();
  }, []);

  return { status, message, loading, error, refresh: fetchMoodRatingStatus };
};

export default useMoodRating;