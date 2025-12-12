// src/services/clientService.js

const API_URL = 'http://localhost:8080/api/clients'; 

// --- Datos Simulados de Perfil ---
const mockClient = {
    id: 'c001',
    firstName: 'Martín',
    lastName: 'Rojas',
    email: 'martin.rojas@ejemplo.com',
    phone: '55 1234 5678',
    address: {
        street: 'Av. Siempre Viva 742',
        city: 'Ciudad de México',
        zipCode: '06000',
        country: 'México'
    },
    joinDate: '2025-01-15',
    lastOrderDate: '2025-12-11'
};

/**
 * Función para obtener el perfil del cliente logueado (Read).
 * En producción, usaría el token JWT para saber qué cliente buscar.
 */
export const getClientProfile = async () => {
    // 🟢 SIMULACIÓN: Obtener datos del perfil
    return new Promise(resolve => 
        setTimeout(() => resolve(mockClient), 500)
    );
};

/**
 * Función para actualizar la información del cliente (Update).
 */
export const updateClientProfile = async (profileData) => {
    console.log("Simulando actualización de perfil:", profileData);
    
    // 🟢 SIMULACIÓN: Devuelve los nuevos datos actualizados
    return new Promise(resolve => 
        setTimeout(() => resolve({ ...mockClient, ...profileData }), 800)
    );
    // En el backend real, esta función haría un PUT a /api/clients/:id
};

// Aquí añadirás después:
// export const getClientOrdersHistory = async (clientId) => { ... } // Se conectaría con M2