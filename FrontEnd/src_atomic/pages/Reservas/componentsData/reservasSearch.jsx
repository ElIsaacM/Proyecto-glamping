import SearchTemplate from "../../../components/templates/searchTemplate";

export const reservationFilterConfig = {
  endpoint: "/api/reservations/filters",
  filters: {
    "Recientes": {
      cacheKey: "incomingReservations",
      localFilter: (arr) => {
        const today = new Date().toISOString().split('T')[0];
        return arr.filter(r => r.llegada.startsWith(today) && r.estado !== 'Cancelado');
      }
    },
    "Pagadas": {
      cacheKey: "paidReservations",
      localFilter: (arr) => arr.filter(r => r.estado === 'Pagado')
    },
    "Confirmadas": {
      cacheKey: "confirmedReservations",
      localFilter: (arr) => arr.filter(r => r.estado === 'Confirmado')
    },
    "Canceladas": {
      cacheKey: "canceledReservations",
      localFilter: (arr) => arr.filter(r => r.estado === 'Cancelado')
    }
  }
};

const options = [
  { nombre: "Recientes", selected: "selected" },
  { nombre: "Pagadas", selected: "" },
  { nombre: "Confirmadas", selected: "" },
  { nombre: "Canceladas", selected: "" },
];

function ReservasSearch({ onResult, onFilterChange }) {
  return (
    <SearchTemplate
      modulo={"reservations"}
      placeholder={"Buscar por factura"}
      onResult={onResult}
      onFilterChange={onFilterChange}
      options={options}
    />
  );
}

export default ReservasSearch;
