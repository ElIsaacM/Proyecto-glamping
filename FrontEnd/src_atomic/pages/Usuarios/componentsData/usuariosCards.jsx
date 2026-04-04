import LinearCard from "../../../components/molecules/cards/linearCard";
import { useFetch } from "../../../hooks/fetchConnect";
import { useEffect } from "react";

export default function UsuariosCard({ refreshTrigger }) {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users/stats`);
  }, [refreshTrigger]);

  const usuariosCardData = [
    {
      bgColor: '',
      colorTitulo: '#ffc107',
      texto: 'Usuarios activos',
      titulo: data?.total_active_users,
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#dc3545',
      texto: 'Sueldo mas alto',
      titulo: data?.highest_payroll,
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#28a745',
      texto: 'Sueldo mas bajo',
      titulo: data?.lowest_payroll,
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: 'verde',
      colorTitulo: '',
      texto: 'Nomina mensual',
      titulo: data?.total_payroll,
      icon: 'bi bi-cash-stack',
    },
  ];

  return (
    <>
      {loading && <p>Cargando estadísticas...</p>}
      {error && <p>Error al cargar datos</p>}
      
      <LinearCard 
        data={usuariosCardData} 
      />
    </>
  );
}
