import { useEffect, useState } from "react";
import { getMoodRating } from "../services/moodRating";

export const useStoredMoodRaing = () => {
  const [moodRating, setMoodRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoodRating = async () => {

    setLoading(true);
    setError(null);

    try {
      const data = await getMoodRating();
      console.log("dataUse", data)
      setMoodRating(data);
    } catch (error) {
      console.error('Fetch error:', error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodRating();
  }, []);

  return {
    moodRating,
    loading,
    error,
  };
};
