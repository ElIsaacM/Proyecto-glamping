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
    if (e && e.preventDefault) e.preventDefault(); // Verificación por si se llama manualmente

    try {
      const cleanedData = { ...formData };
      
      const userName = localStorage.getItem('userName');
      if (userName) {
        cleanedData.userName = userName;
      }

      Object.keys(cleanedData).forEach(key => {
        if (key.includes('_id') && cleanedData[key] === '') {
          cleanedData[key] = null;
        }
      });

      // IMPORTANTE: postData debe lanzar un error si la respuesta no es 2xx
      const response = await postData(url, {
        method: method,
        body: JSON.stringify(cleanedData)
      });

      // SI LLEGAMOS AQUÍ, ES QUE FUE EXITOSO (Status 200-299)
      if (method === 'POST') {
        setFormData(initialState);
      }

      if (cerrarModal) cerrarModal();
      if (onSuccess) onSuccess(response); // Pasamos la respuesta (donde viene el TOKEN)

    } catch (err) {
      // No hace falta hacer nada más, useFetch ya puso el error en 'submitError'
      console.error("Error al enviar formulario:", err);
    }
  };

  return { formData, handleChange, handleSubmit, submitting, submitError, setFormData };
};
