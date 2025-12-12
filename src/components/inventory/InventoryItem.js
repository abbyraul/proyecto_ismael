// src/components/inventory/InventoryItem.js

import React, { useState } from 'react';
import inventoryService from '../../services/inventoryService';

const InventoryItem = ({ item, onStockUpdated }) => {
    // Estado local para el stock que se está editando
    const [currentStock, setCurrentStock] = useState(item.stock);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Indicador de stock bajo para alertas visuales
    const isLowStock = currentStock <= item.minStock;

    const handleUpdateStock = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Llama al servicio con la cantidad de stock editada
            const updatedItem = await inventoryService.updateStock(item.id, currentStock);
            
            // Notifica al componente padre para actualizar la lista global
            onStockUpdated(updatedItem);
            alert(`Stock de ${updatedItem.name} actualizado a ${updatedItem.stock}`);
        } catch (err) {
            console.error("Error al actualizar stock:", err);
            setError(err.message || "Error al guardar los cambios.");
            // Revertir el estado local al original en caso de error
            setCurrentStock(item.stock); 
        } finally {
            setIsLoading(false);
        }
    };

    // Estilos condicionales
    const stockStatusStyle = isLowStock 
        ? { color: 'white', backgroundColor: '#dc3545', padding: '5px', borderRadius: '4px', fontWeight: 'bold' } 
        : { color: '#28a745', fontWeight: 'bold' };

    return (
        <tr style={styles.row}>
            <td style={styles.cell}>{item.id}</td>
            <td style={{ ...styles.cell, ...styles.nameCell }}>{item.name}</td>
            <td style={styles.cell}>
                <span style={stockStatusStyle}>
                    {currentStock}
                </span>
            </td>
            <td style={styles.cell}>{item.minStock}</td>
            <td style={styles.cell}>
                <div style={styles.stockControls}>
                    <button 
                        onClick={() => setCurrentStock(Math.max(0, currentStock - 1))} 
                        style={{ ...styles.controlButton, ...styles.decreaseButton }}
                        disabled={isLoading || currentStock <= 0}
                    >
                        -
                    </button>
                    <input 
                        type="number"
                        min="0"
                        value={currentStock}
                        onChange={(e) => setCurrentStock(parseInt(e.target.value) || 0)} // Asegura que sea un número
                        style={styles.stockInput}
                        disabled={isLoading}
                    />
                    <button 
                        onClick={() => setCurrentStock(currentStock + 1)} 
                        style={{ ...styles.controlButton, ...styles.increaseButton }}
                        disabled={isLoading}
                    >
                        +
                    </button>
                </div>
            </td>
            <td style={styles.cell}>
                <button 
                    onClick={handleUpdateStock} 
                    style={styles.saveButton}
                    disabled={isLoading || currentStock === item.stock} 
                >
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                {error && <p style={styles.errorText}>{error}</p>}
            </td>
        </tr>
    );
};

const styles = {
    row: { borderBottom: '1px solid #eee' },
    cell: { padding: '12px 15px', textAlign: 'center', verticalAlign: 'middle' },
    nameCell: { textAlign: 'left' },
    stockControls: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' },
    controlButton: {
        width: '30px', height: '30px', borderRadius: '50%', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s',
    },
    increaseButton: { backgroundColor: '#28a745', color: 'white' },
    decreaseButton: { backgroundColor: '#ffc107', color: '#212529' },
    stockInput: { width: '50px', textAlign: 'center', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' },
    saveButton: {
        padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s',
        minWidth: '120px'
    },
    errorText: { color: '#dc3545', fontSize: '0.8em', margin: '5px 0 0 0' }
};

export default InventoryItem;