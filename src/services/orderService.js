// src/services/orderService.js

const API_URL = 'http://localhost:8080/api/orders';

// --- Datos Simulados de Pedidos (Mock Data) ---
const mockOrders = [
    { 
      id: 'o001', 
      clientName: 'Juan Pérez', 
      date: '2025-12-10',
      status: 'Entregado', 
      total: 1295.50,
      items: [
          { name: 'Laptop Gamer X1', quantity: 1, price: 1200.00 },
          { name: 'Teclado Mecánico RGB', quantity: 1, price: 95.50 }
      ]
    },
    { 
      id: 'o002', 
      clientName: 'Ana García', 
      date: '2025-12-11',
      status: 'En Proceso', 
      total: 80.00,
      items: [
          { name: 'Mouse Inalámbrico Ergonómico', quantity: 2, price: 40.00 }
      ]
    },
];

/**
 * Función para obtener la lista de todos los pedidos.
 */
export const getAllOrders = async () => {
    // 🟢 SIMULACIÓN (Reemplazar con fetch/axios cuando el Backend esté listo):
    return new Promise(resolve => 
        setTimeout(() => resolve(mockOrders), 600)
    );
};

/**
 * Función para obtener el detalle de un pedido por ID.
 */
export const getOrderById = async (orderId) => {
    // 🟢 SIMULACIÓN (Busca el pedido simulado):
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const order = mockOrders.find(o => o.id === orderId);
            if (order) {
                resolve(order);
            } else {
                reject(new Error("Pedido no encontrado"));
            }
        }, 300);
    });
};

// Aquí añadirás después:
// export const createOrder = async (orderData) => { ... }
// export const updateOrderStatus = async (orderId, newStatus) => { ... }
// export const deleteOrder = async (orderId) => { ... }