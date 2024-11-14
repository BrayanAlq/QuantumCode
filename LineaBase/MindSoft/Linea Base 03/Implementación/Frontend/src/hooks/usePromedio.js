import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { fetchPromedio } from "../services/promedio";

export const usePromedio = () => {
  const [rating_week, setRating_week] = useState(0.0);
  const [rating_all, setRating_all] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  
  // Obtener el token desde el almacenamiento seguro y hacer la llamada a la API
  

  const fetchStatRating = async(dateStat)=>{
        
        setError(null);
        setLoading(true);
        try{

            const token = await SecureStore.getItemAsync("authToken");
            const response = await fetchPromedio(token,dateStat);
            setRating_week(response.rating_week)
            setRating_all(response.rating_all)
           
            if(response.error){
            throw new Error(response.error)
                } 
            return response;
        }catch(err){
            setError(err.message);
        }finally{setLoading(false)}
        
    };



  // Devolver los valores necesarios
  return {
    rating_week,
    rating_all,
    error,
    loading,
    fetchStatRating,
  };
};
