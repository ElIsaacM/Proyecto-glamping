import SearchTemplate from "../../../components/templates/searchTemplate";

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
      options={''}
    />
  );
}

export default Buscador;

