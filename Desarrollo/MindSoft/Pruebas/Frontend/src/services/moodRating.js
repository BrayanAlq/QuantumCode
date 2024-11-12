import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { getLocalDay } from "../utils/getLocalDay";

export const createMoodRating = async (moodRating, token) => {
  try {
    const response = await fetch(`${API_URL}/mood-rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: moodRating.date,
        mood_detail: moodRating.mood_detail,
      }),
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

export const getMoodRating = async () => {
  const fecha = getLocalDay();
  const token = await SecureStore.getItemAsync("authToken");
  console.log("tokenGET", token);
  const response = await fetch(`${API_URL}/stats-moods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      date: fecha,
    }),
  });

  console.log("responseGET", response);
  if (!response.ok) {
    throw new Error("Error fetching mood rating");
  }

  return await response.json();
};
