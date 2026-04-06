import SearchTemplate from "../../../components/templates/searchTemplate";

export const serviceFilterConfig = {
  endpoint: 'api/services/filters',
  filters: {
    "Inactivos": {
      cachekey: 'idle_services',
      localFilter: (arr) => arr.filter(s => s.estado === 'Inactivo')
    },
    "Mas largos": {
      cachekey: 'longer_services',
      localFilter: (arr) => [...arr].sort((a,b) => b.duracionminutos - a.duracionminutos)
    },
    "Mas cortos": {
      cachekey: 'shorter_services',
      localFilter: (arr) => [...arr].sort((a,b) => a.duracionminutos - b.duracionminutos)
    },
    "Mas caros": {
      cachekey: 'expensive_services',
      localFilter: (arr) => [...arr].sort((a,b) => b.precio - a.precio)
    },
    "Mas baratos": {
      cachekey: 'cheap_services',
      localFilter: (arr) => [...arr].sort((a,b) => a.precio - b.precio)
    }
  }
}

function Buscador({ onResult, onFilterChange }) {
  const options = [
    {nombre: 'Todos', selected: 'selected'},
    {nombre: 'Inactivos', selected: ''},
    {nombre: 'Longitud DESC', selected: ''},
    {nombre: 'Longitud ASC', selected: ''},
    {nombre: 'Precio DESC', selected: ''},
    {nombre: 'Precio ASC', selected: ''}
  ];

  return (
    <SearchTemplate
      modulo={'services'}
      placeholder={'Buscar servicio'}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  )
}

export default Buscador;