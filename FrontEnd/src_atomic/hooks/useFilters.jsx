import { useState, useEffect, useMemo, useCallback } from "react";
import { useFetch } from "./fetchConnect";

export const useFilters = (data, searchResults, config) => {
  const [filterMode, setFilterMode] = useState("Todos");
  const { data: filtersData, fetchData } = useFetch();

  // Carga la "bolsa" de filtros del backend
  const fetchFilters = useCallback(() => {
    if (config?.endpoint) {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}${config.endpoint}`);
    }
  }, [config?.endpoint, fetchData]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const displayData = useMemo(() => {
    // 1. Si no hay filtro, mostramos búsqueda o data general
    const base = searchResults ?? data ?? [];
    if (filterMode === "Todos") return base;

    const current = config.filters[filterMode];

    // 2. Si NO hay búsqueda, usamos la respuesta rápida del backend (filtersData)
    if (searchResults === null && filtersData?.[current.cacheKey]) {
      return filtersData[current.cacheKey];
    }

    // 3. Si hay búsqueda, aplicamos el filtro localmente sobre los resultados
    return current.localFilter ? current.localFilter(base) : base;
  }, [filterMode, data, searchResults, filtersData, config]);

  return { displayData, filterMode, setFilterMode, fetchFilters };
};
