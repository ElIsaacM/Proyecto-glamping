import SearchTemplate from "../../../components/templates/searchTemplate";

export const pagosFilterConfig = {
  endpoint: '/api/payments/filters',
  filters: {
    "Pagos recientes": {
      cacheKey: 'recent_payments',
      localFilter: (arr) => [...arr].sort((a, b) => new Date(b.fecha_pago) - new Date(a.fecha_pago))
    },
    "Pagos exitosos": {
      cacheKey: 'sucefull_payments',
      localFilter: (arr) => arr.filter(p => p.estado === 'Completado')
    },
    "Pagos rechazados": {
      cacheKey: 'rejected_payments',
      localFilter: (arr) => arr.filter(p => p.estado === 'Rechazado')
    },
    "Reembolsos pendientes": {
      localFilter: (arr) => arr.filter(r => r.estado === 'Pendiente')
    },
    "Reembolsos aprobados": {
      localFilter: (arr) => arr.filter(r => r.estado === 'Aprobado')
    },
    "Reembolsos rechazados": {
      localFilter: (arr) => arr.filter(r => r.estado === 'Rechazado')
    },
  }
};

function Buscador({ activeTab = 'payments', onResult, onFilterChange }) {
  
  const getOptions = () => {
    if (activeTab === 'payments') {
      return [
        { nombre: 'Todos', selected: 'selected' },
        { nombre: 'Pagos recientes', selected: '' },
        { nombre: 'Pagos exitosos', selected: '' },
        { nombre: 'Pagos rechazados', selected: '' },
      ];
    } else if (activeTab === 'refounds') {
      return [
        { nombre: 'Todos', selected: 'selected' },
        { nombre: 'Reembolsos pendientes', selected: '' },
        { nombre: 'Reembolsos aprobados', selected: '' },
        { nombre: 'Reembolsos rechazados', selected: '' },
      ];
    }
    // Para facturas no mostramos filtros (vacío para que no renderice SelectBase)
    return [];
  };

  const getPlaceholder = () => {
    if (activeTab === 'invoices') return 'Buscar por cliente';
    return 'Buscar por factura';
  };

  return (
    <SearchTemplate
      key={activeTab} // Fuerza a que se reinicie el buscador al cambiar de pestaña
      modulo={activeTab} // 'payments', 'refounds', 'invoices'
      placeholder={getPlaceholder()}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={getOptions()}
    />
  );
}

export default Buscador;

