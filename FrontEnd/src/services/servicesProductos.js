import axios from "axios";


const API_URL = "http://localhost:5000/productos"


export const crearProducto = async (producto) => {
    try {
       const response = await axios.post(API_URL, producto);
       return response.data;
     } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
       } 
    
};

export const obtenerProductos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
} catch (error) {
    
}
}