// src/services/inventoryService.js

// Mock de datos de inventario
const mockInventory = [
    { id: 1, productId: 1, name: 'Laptop Gamer X1', stock: 15, minStock: 5 },
    { id: 2, productId: 2, name: 'Smartphone Z5', stock: 250, minStock: 50 },
    { id: 3, productId: 3, name: 'Smartwatch W1', stock: 80, minStock: 20 },
    { id: 4, productId: 4, name: 'Auriculares Bluetooth T9', stock: 120, minStock: 30 },
    { id: 5, productId: 5, name: 'Teclado Mecánico K8', stock: 45, minStock: 10 },
    // Producto con bajo stock para visualización
    { id: 6, productId: 6, name: 'Mouse Inalámbrico M5', stock: 5, minStock: 10 }, 
    { id: 7, productId: 7, name: 'Monitor Curvo 32"', stock: 30, minStock: 15 },
    { id: 8, productId: 8, name: 'Silla Gamer Ergonómica', stock: 10, minStock: 5 },
];

// Usamos una copia para simular la persistencia en memoria
let currentInventory = [...mockInventory];

/**
 * Simula la obtención de todo el inventario de productos.
 */
const getInventory = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Retorna una copia para evitar mutaciones inesperadas
            resolve([...currentInventory]); 
        }, 500); // Retardo simulado
    });
};

/**
 * Simula la actualización del stock de un producto.
 */
const updateStock = (inventoryId, newStock) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = currentInventory.findIndex(item => item.id === inventoryId);

            if (index !== -1) {
                if (newStock < 0) {
                    return reject({ message: "Error: El stock no puede ser negativo." });
                }
                
                // Actualiza el item
                currentInventory[index] = {
                    ...currentInventory[index],
                    stock: newStock
                };
                resolve(currentInventory[index]);
            } else {
                reject({ message: "Error: Item de inventario no encontrado" });
            }
        }, 500); // Retardo simulado
    });
};

export default {
    getInventory,
    updateStock,
};