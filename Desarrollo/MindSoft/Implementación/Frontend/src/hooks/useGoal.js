import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        setToken(storedToken);
      } catch (err) {
        setError("Error retrieving token");
      }
    };

    fetchToken();
  }, []);

  const fetchGoals = async () => {
    if (!token) return; // No hacer nada si no hay token

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/goal-active`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }

      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals(); // Llama a fetchGoals cuando se establece el token
  }, []);

  const createGoal = async (goalData) => {
    try {
      const response = await fetch(`${API_URL}/goal-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el objetivo");
      }

      await fetchGoals(); // Actualiza la lista después de crear
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateGoal = async (goalData) => {
    try {
      const response = await fetch(`${API_URL}/goal-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Error al modificar el objetivo");
      }

      await fetchGoals(); // Actualiza la lista después de modificar
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`${API_URL}/goal-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goal_id: goalId }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el objetivo");
      }

      await fetchGoals(); // Actualiza la lista después de eliminar
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    goals,
    loading,
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    fetchGoals,
  };
};
