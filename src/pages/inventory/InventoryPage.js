// src/pages/inventory/InventoryPage.js

import React from 'react';
// ⬅️ Importa el componente que contiene toda la lógica de la tabla
import InventoryList from '../../components/inventory/InventoryList'; 

const InventoryPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>M4: Gestión de Inventario</h1>
            <p style={styles.subtitle}>Panel administrativo para el control y ajuste de stock de productos.</p>
            
            {/* ⬅️ Aquí se renderiza la tabla de inventario */}
            <InventoryList />

        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        minHeight: '80vh',
    },
    title: {
        textAlign: 'center',
        color: '#343a40',
        marginBottom: '10px',
        fontSize: '2.5em',
    },
    subtitle: {
        textAlign: 'center',
        color: '#6c757d',
        marginBottom: '30px',
        fontSize: '1.1em',
    }
};

export default InventoryPage;