import SearchTemplate from "../../../components/templates/searchTemplate";

export const userFilterConfig = {
  endpoint: '/api/users/filters',
  filters: {
    "Sueldo DESC": {
      cacheKey: 'payroll_desc',
      localFilter: (arr) => [...arr].sort((a, b) => parseFloat(b.sueldo) - parseFloat(a.sueldo))
    },
    "Sueldo ASC": {
      cacheKey: 'payroll_asc',
      localFilter: (arr) => [...arr].sort((a, b) => parseFloat(a.sueldo) - parseFloat(b.sueldo))
    },
    "Inactivos": {
      cacheKey: 'idle_status',
      localFilter: (arr) => arr.filter(u => u.estado === 'Inactivo')
    },
    "Administradores": {
      cacheKey: 'admin_users',
      localFilter: (arr) => arr.filter(u => u.rolid == 1)
    }
  }
};

function Buscador({ onResult, onFilterChange }) {
  const options = [
    { nombre: 'Todos', selected: 'selected' },
    { nombre: 'Sueldo DESC', selected: '' },
    { nombre: 'Sueldo ASC', selected: '' },
    { nombre: 'Inactivos', selected: '' },
    { nombre: 'Administradores', selected: '' },
  ];

  return (
    <SearchTemplate
      modulo={'users'}
      placeholder={'Buscar usuario'}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  );
}

export default Buscador;