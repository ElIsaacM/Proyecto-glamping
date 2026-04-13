import SearchTemplate from "../../../components/templates/searchTemplate";

export const productosFilterConfig = {
  endpoint: "/api/products/filters",
  filters: {
    Inactivos: {
      cacheKey: "idle_products",
      localFilter: (arr) => arr.filter((p) => p.estado === "Inactivo"),
    },
    "Precio DESC": {
      cacheKey: "expensive_products",
      localFilter: (arr) => [...arr].sort((a, b) => b.precio - a.precio),
    },
    "Precio ASC": {
      cacheKey: "cheap_products",
      localFilter: (arr) => [...arr].sort((a, b) => a.precio - b.precio),
    },
  },
};

const options = [
  { nombre: "Todos", selected: "selected" },
  { nombre: "Inactivos", selected: "" },
  { nombre: "Precio DESC", selected: "" },
  { nombre: "Precio ASC", selected: "" },
];

function ProductosSearch({ onResult, onFilterChange }) {
  return (
    <SearchTemplate
      modulo={"products"}
      placeholder={"Buscar producto"}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  );
}

export default ProductosSearch;