import { useState } from "react";
import { useFetch } from "./fetchConnect";

/**
 * Hook personalizado para manejar formularios, sus estados y envío al backend
 * reutilizando la lógica base de useFetch internamente.
 * 
 * @param {Object} initialState - El estado con valores iniciales del formulario (ej. { nombre: '', edad: 0 })
 * @param {string} url - El endpoint a donde enviar (POST) los datos
 * @param {Function} onSuccess - Un callback que se ejecuta tras una respuesta HTTP 200/201 éxitosa (ideal para recargar tablas)
 */
export const useForm = (initialState, url, onSuccess, method = 'POST') => {
  const [formData, setFormData] = useState(initialState);
  const { loading: submitting, error: submitError, fetchData: postData } = useFetch();

  const handleChange = (e) => {
    // Extraemos los valores del evento para evitar problemas si el evento se "limpia"
    const { name, value } = e.target;

    // Usamos la función de callback (prevData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e, cerrarModal) => {
    e.preventDefault();
    try {
      // Hacemos el request usando el método especificado (POST por defecto)
      await postData(url, {
        method: method,
        body: JSON.stringify(formData)
      });

      // Limpiar formulario tras éxito solo si es POST (en PUT usualmente se mantiene o se cierra modal)
      if (method === 'POST') {
        setFormData(initialState);
      }

      // Ocultar modal e invocar la acción de recarga local de datos
      if (cerrarModal) cerrarModal();
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("Error al enviar formulario:", err);
    }
  };

  return { formData, handleChange, handleSubmit, submitting, submitError, setFormData };
};
