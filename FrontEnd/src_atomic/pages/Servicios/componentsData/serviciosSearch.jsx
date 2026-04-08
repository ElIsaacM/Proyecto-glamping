import SearchTemplate from "../../../components/templates/searchTemplate";

export const serviciosFilterConfig = {
  endpoint: "/api/services/filters",
  filters: {
    Inactivos: {
      cacheKey: "idle_services",
      localFilter: (arr) => arr.filter((s) => s.estado === "Inactivo"),
    },
    "Longitud DESC": {
      cacheKey: "longer_services",
      localFilter: (arr) =>
        [...arr].sort(
          (a, b) => b["Duracion en minutos"] - a["Duracion en minutos"],
        ),
    },
    "Longitud ASC": {
      cacheKey: "shorter_services",
      localFilter: (arr) =>
        [...arr].sort(
          (a, b) => a["Duracion en minutos"] - b["Duracion en minutos"],
        ),
    },
    "Precio DESC": {
      cacheKey: "expensive_services",
      localFilter: (arr) => [...arr].sort((a, b) => b.precio - a.precio),
    },
    "Precio ASC": {
      cacheKey: "cheap_services",
      localFilter: (arr) => [...arr].sort((a, b) => a.precio - b.precio),
    },
  },
};

const options = [
  { nombre: "Todos", selected: "selected" },
  { nombre: "Inactivos", selected: "" },
  { nombre: "Longitud DESC", selected: "" },
  { nombre: "Longitud ASC", selected: "" },
  { nombre: "Precio DESC", selected: "" },
  { nombre: "Precio ASC", selected: "" },
];

function ServiciosSearch({ onResult, onFilterChange }) {
  return (
    <SearchTemplate
      modulo={"services"}
      placeholder={"Buscar servicio"}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  );
}

export default ServiciosSearch;
