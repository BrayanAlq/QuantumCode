import { API_URL } from "./constants";

export const fetchRecomendaciones = async (token) => {
  try {
    const response = await fetch(`${API_URL}/recomendations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching recomendaciones");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};
