import SearchTemplate from "../../../components/templates/searchTemplate";

export const paquetesFilterConfig = {
    endpoint: "/api/packages/filters",
    filters: {
        Inactivos: {
            cacheKey: "idle_packages",
            localFilter: (arr) => arr.filter((p) => p.estado === "Inactivo"),
        },
        "Tipo DESC": {
            cacheKey: "type_packages_DESC",
            localFilter: (arr) => [...arr].sort((a, b) => b.tipo.localeCompare(a.tipo)),
        },
        "Tipo ASC": {
            cacheKey: "type_packages_ASC",
            localFilter: (arr) => [...arr].sort((a, b) => a.tipo.localeCompare(b.tipo)),
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
    { nombre: "Tipo DESC", selected: "" },
    { nombre: "Tipo ASC", selected: "" },
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
