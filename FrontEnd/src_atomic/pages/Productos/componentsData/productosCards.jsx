import RectangleCard from "../../../components/molecules/cards/rectangleCard";
import PieGraph from "../../../components/organisms/graphs/PieGraph";
import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

function ProductosCards({ refreshTrigger }) {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products/stats`);
  }, [refreshTrigger]);

  const mostFrecuent = data?.most_frecuent_product?.[0];
  const leastFrecuent = data?.least_frecuent_product?.[0];

  const productosCardData = [
    {
      bgColor: "verde",
      icono: "bi bi-box-fill",
      titulo: "Producto mas vendido",
      info: mostFrecuent ? mostFrecuent.producto_nombre : "N/A",
      texto: mostFrecuent
        ? `El producto ha sido vendido ${mostFrecuent.veces_reservado} veces y ha generado $${mostFrecuent.ingresos_generados} en ingresos`
        : "Sin datos",
    },
    {
      bgColor: "",
      icono: "bi bi-box-fill",
      titulo: "Producto menos vendido",
      info: leastFrecuent ? leastFrecuent.producto_nombre : "N/A",
      texto: leastFrecuent
        ? `El producto ha sido vendido solo ${leastFrecuent.veces_reservado} veces y ha generado $${leastFrecuent.ingresos_generados} en ingresos`
        : "Sin datos",
    },
  ];

  const pieGraphData = [
    {
      titulo: "Top 3 productos",
      data:
        data?.top_products?.map((item) => ({
          name: item.producto_nombre,
          value: parseInt(item.veces_reservado, 10),
          income: parseFloat(item.ingresos_generados).toFixed(2),
        })) || [],
    },
  ];

  return (
    <>
      {loading && <p>Cargando estadísticas...</p>}
      {error && <p>Error al cargar datos</p>}
      {data && (
        <>
          <RectangleCard rectangleData={productosCardData} />
          <PieGraph pieGraphData={pieGraphData} />
        </>
      )}
    </>
  );
}

export default ProductosCards;
