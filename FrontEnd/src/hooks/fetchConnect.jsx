import { useState, useCallback } from "react";

/**
 * Hook personalizado para manejar peticiones HTTP al backend.
 *
 * @returns {Object} Un objeto con:
 * - data: El resultado de la petición (JSON).
 * - loading: Booleano que indica si la petición está en curso.
 * - error: El error de la petición si ocurre.
 * - fetchData: Función para disparar la petición manualmente.
 */
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    // Configuración por defecto para JSON
    const defaultOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result; // Útil para manejarlo en el componente inmediatamente
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};
