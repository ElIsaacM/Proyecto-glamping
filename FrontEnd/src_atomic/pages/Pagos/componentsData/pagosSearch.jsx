import SearchTemplate from "../../../components/templates/searchTemplate";

export const pagosFilterConfig = {
  endpoint: '/api/payments/filters',
  filters: {
    "Pagos recientes": {
      cacheKey: 'recent_payments',
      localFilter: (arr) => [...arr].sort((a, b) => new Date(b.fecha_pago) - new Date(a.fecha_pago))
    },
    "Pagos exitosos": {
      cacheKey: 'successful_payments',
      localFilter: (arr) => arr.filter(p => p.estado === 'exitoso')
    },
    "Pagos rechazados": {
      cacheKey: 'rejected_payments',
      localFilter: (arr) => arr.filter(p => p.estado === 'rechazado')
    },
  }
};

function Buscador({ onResult, onFilterChange }) {
  const options = [
    { nombre: 'Todos', selected: 'selected' },
    { nombre: 'Pagos recientes', selected: '' },
    { nombre: 'Pagos exitosos', selected: '' },
    { nombre: 'Pagos rechazados', selected: '' },
  ];

  return (
    <SearchTemplate
      modulo={'payments'}
      placeholder={'Buscar por factura'}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  );
}

export default Buscador;

