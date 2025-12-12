// src/services/productService.js

// ⚠️ NOTA: Reemplaza esta URL por la dirección real de tu Backend (ej: http://localhost:5000)
const API_URL = 'http://localhost:8080/api/products'; 

// --- Datos Simulados (Mock Data) para probar el Frontend ---
const mockProducts = [
    { id: 'p1', name: 'Laptop Gamer X1', price: 1200.00, stock: 15, description: 'Potente laptop para juegos de alto rendimiento.' },
    { id: 'p2', name: 'Teclado Mecánico RGB', price: 95.50, stock: 45, description: 'Teclado con switches táctiles y luz personalizable.' },
    { id: 'p3', name: 'Mouse Inalámbrico Ergonómico', price: 45.00, stock: 80, description: 'Diseño cómodo para largas horas de uso.' },
];

/**
 * Función para obtener la lista de todos los productos.
 * Por ahora usa datos simulados, luego usará fetch/axios.
 */
export const getAllProducts = async () => {
    console.log("Intentando obtener productos...");

    try {
        // 🚨 CAMBIAR ESTO: Para Backend real, descomenta las líneas de abajo:
        /*
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Si la ruta es protegida: 'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
        */

        // 🟢 SIMULACIÓN (Quitar al conectar el Backend):
        return new Promise(resolve => 
            setTimeout(() => resolve(mockProducts), 500) // Simula un delay de 0.5 segundos
        );

    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

// Puedes añadir más funciones aquí después:
// export const createProduct = async (productData) => { ... }
// export const updateProduct = async (id, productData) => { ... }
// export const deleteProduct = async (id) => { ... }