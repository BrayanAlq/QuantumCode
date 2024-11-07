import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../services/constants";

export const useRecomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecomendaciones = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Obtener el token si es necesario
      const token = await SecureStore.getItemAsync("authToken");
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(`${API_URL}/recomendations`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Error fetching recomendaciones");
      }

      const data = await response.json();
      setRecomendaciones(data["response"]["recomendations"]);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { recomendaciones, isLoading, error, fetchRecomendaciones };
};
