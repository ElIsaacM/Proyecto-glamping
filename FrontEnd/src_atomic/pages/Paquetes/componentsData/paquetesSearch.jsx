import SearchTemplate from "../../../components/templates/searchTemplate";

export const paquetesFilterConfig = {
    endpoint: "/api/packages/filters",
    filters: {
        Inactivos: {
            cacheKey: "idle_packages",
            localFilter: (arr) => arr.filter((p) => p.estado === "Inactivo"),
        },
        "Dias DESC": {
            cacheKey: "longer_stay_packages",
            localFilter: (arr) => [...arr].sort((a, b) => b.dias - a.dias),
        },
        "Dias ASC": {
            cacheKey: "shorter_stay_packages",
            localFilter: (arr) => [...arr].sort((a, b) => a.dias - b.dias),
        },
    }
}

const options = [
    { nombre: "Todos", selected: "selected" },
    { nombre: "Inactivos", selected: "" },
    { nombre: "Dias DESC", selected: "" },
    { nombre: "Dias ASC", selected: "" },
];

function PaquetesSearch({ onResult, onFilterChange }) {
    return (
        <SearchTemplate
            modulo={"packages"}
            placeholder={"Buscar paquete"}
            onResult={onResult}
            onFilterChange={onFilterChange}
            options={options}
        />
    );
}

export default PaquetesSearch;
