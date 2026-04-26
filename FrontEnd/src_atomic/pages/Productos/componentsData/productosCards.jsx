import RectangleCard from "../../../components/molecules/cards/rectangleCard";
import PieGraph from "../../../components/organisms/graphs/PieGraph";
import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";
import { formatCurrency } from "../../../utils/formattersUtil";

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
      info: mostFrecuent ? mostFrecuent.producto : "N/A",
      texto: mostFrecuent
        ? `El producto ha sido vendido ${mostFrecuent.veces_reservado} veces y ha generado ${formatCurrency(mostFrecuent.ingresos_generados)} en ingresos`
        : "Sin datos",
    },
    {
      bgColor: "",
      icono: "bi bi-box-fill",
      titulo: "Producto menos vendido",
      info: leastFrecuent ? leastFrecuent.producto : "N/A",
      texto: leastFrecuent
        ? `El producto ha sido vendido solo ${leastFrecuent.veces_reservado} veces y ha generado ${formatCurrency(leastFrecuent.ingresos_generados)} en ingresos`
        : "Sin datos",
    },
  ];

  const pieGraphData = [
    {
      titulo: "Top 3 productos",
      data:
        data?.top_products?.map((item) => ({
          name: item.producto,
          value: parseInt(item.veces_reservado, 10),
          income: formatCurrency(item.ingresos_generados),
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
