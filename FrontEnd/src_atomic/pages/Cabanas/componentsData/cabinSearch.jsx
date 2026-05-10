import SearchTemplate from "../../../components/templates/searchTemplate";

export const cabinFilterConfig = {
  endpoint: "/api/cabins/filters",
  filters: {
    "Inactivas": {
      cacheKey: "inactiveCabins",
      localFilter: (arr) => arr.filter(c => c.estado === 'Inactivo')
    }
  }
};

const cabinOptions = [
  { nombre: "Todos", selected: "selected" },
  { nombre: "Inactivas", selected: "" },
];

function Buscador({ activeTab = 'cabin', onResult, onFilterChange }) {
  const getPlaceholder = () => {
    if (activeTab === 'cabinDamage') return 'Buscar por cabaña';
    return 'Buscar por nombre';
  };

  return (
    <SearchTemplate
      key={activeTab} // Fuerza a que se reinicie el buscador al cambiar de pestaña
      modulo={activeTab} // 'payments', 'refounds', 'invoices'
      placeholder={getPlaceholder()}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={activeTab === 'cabins' ? cabinOptions : ''}
    />
  );
}

export default Buscador;

