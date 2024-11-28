import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { fetchUserInfo } from '../services/user';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (!token) {
          throw new Error("No token found");
        }
        
        const data = await fetchUserInfo(token);

        if (data.error) {
          throw new Error(data.error);
        }

        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []); 

  return { userInfo, loading, error };
};