// src/components/inventory/InventoryList.js

import React, { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import inventoryService from '../../services/inventoryService';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para cargar el inventario
    const fetchInventory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await inventoryService.getInventory();
            setInventory(data);
        } catch (err) {
            console.error("Error al cargar el inventario:", err);
            setError("No se pudo cargar la lista de inventario.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    // Función que recibe el item actualizado del hijo (InventoryItem)
    const handleStockUpdated = (updatedItem) => {
        setInventory(prevInventory => 
            // Mapea la lista y reemplaza el item modificado
            prevInventory.map(item => 
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    if (isLoading) {
        return <h3 style={{textAlign: 'center'}}>Cargando inventario...</h3>;
    }

    if (error) {
        return <h3 style={{textAlign: 'center', color: '#dc3545'}}>{error}</h3>;
    }

    if (inventory.length === 0) {
        return <h3 style={{textAlign: 'center'}}>No hay productos en inventario.</h3>;
    }
    
    // Clasificación para mostrar productos con Stock Bajo primero
    const sortedInventory = [...inventory].sort((a, b) => {
        const aIsLow = a.stock <= a.minStock;
        const bIsLow = b.stock <= b.minStock;
        
        if (aIsLow && !bIsLow) return -1; // a (bajo) va antes que b
        if (!aIsLow && bIsLow) return 1;  // b (bajo) va antes que a
        return 0; // mantener orden
    });

    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={{ ...styles.headerCell, width: '5%' }}>ID</th>
                        <th style={{ ...styles.headerCell, width: '40%', textAlign: 'left' }}>Producto</th>
                        <th style={{ ...styles.headerCell, width: '10%' }}>Stock Actual</th>
                        <th style={{ ...styles.headerCell, width: '10%' }}>Stock Mínimo</th>
                        <th style={{ ...styles.headerCell, width: '20%' }}>Ajuste de Stock</th>
                        <th style={{ ...styles.headerCell, width: '15%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedInventory.map(item => (
                        <InventoryItem 
                            key={item.id} 
                            item={item} 
                            onStockUpdated={handleStockUpdated} // Pasa la función de actualización
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '30px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    headerRow: {
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
    },
    headerCell: {
        padding: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '0.9em',
        color: '#343a40',
    }
};

export default InventoryList;