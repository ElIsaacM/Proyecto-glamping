import { useState, useEffect } from "react";
import { useFetch } from "./fetchConnect";

export const useSearch = (modulo, onResult) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchData, data } = useFetch();

  // Optimizado: Solo buscamos si hay texto, si no, restauramos la tabla a su estado original.
  useEffect(() => {
    const isSearch = searchTerm.trim().length > 0;

    if (!isSearch) {
      // Si está vacio, mandamos null para que la tabla principal restaure los datos ya cargados (0 requests extras)
      onResult(null);
      return;
    }

    const delay = setTimeout(() => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/${modulo}/search`;
      const config = { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: searchTerm }) 
      };

      fetchData(url, config);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm, modulo, fetchData, onResult]); 

  // Sincronizar resultados obtenidos con el padre
  useEffect(() => {
    if (data && searchTerm.trim().length > 0) {
      onResult(data);
    }
  }, [data, onResult, searchTerm]);

  return { searchTerm, setSearchTerm };
};
