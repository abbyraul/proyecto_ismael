// src/pages/orders/OrdersPage.js

import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/orderService';
// Usaremos useNavigate para navegar al detalle de un pedido
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
                setError(null);
            } catch (err) {
                setError("Error al cargar los pedidos. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (orderId) => {
        // Al hacer clic, navega a una ruta de detalle, por ejemplo: /admin/pedidos/o001
        navigate(`/admin/pedidos/${orderId}`);
    };

    if (loading) {
        return <h2 style={styles.message}>Cargando pedidos...</h2>;
    }

    if (error) {
        return <h2 style={{...styles.message, color: 'red'}}>⚠️ {error}</h2>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Gestión de Pedidos (M2)</h1>
            
            {orders.length === 0 ? (
                <p style={styles.message}>No hay pedidos registrados.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Cliente</th>
                            <th style={styles.th}>Fecha</th>
                            <th style={styles.th}>Total</th>
                            <th style={styles.th}>Estado</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={styles.tr}>
                                <td style={styles.td}>{order.id}</td>
                                <td style={styles.td}>{order.clientName}</td>
                                <td style={styles.td}>{order.date}</td>
                                <td style={styles.td}>${order.total.toFixed(2)}</td>
                                <td style={styles.td}>
                                    <span style={getStatusStyle(order.status)}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button 
                                        onClick={() => handleViewDetails(order.id)}
                                        style={styles.detailsButton}
                                    >
                                        Ver Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {/* Aquí añadirías el componente para Crear Nuevo Pedido */}
            <button style={{...styles.detailsButton, marginTop: '20px', backgroundColor: '#007bff'}}>
                + Crear Nuevo Pedido
            </button>
        </div>
    );
};

// Función de estilo para el estado
const getStatusStyle = (status) => {
    let color = '#333';
    let bgColor = '#eee';
    if (status === 'Entregado') {
        color = 'green';
        bgColor = '#e6ffe6';
    } else if (status === 'En Proceso') {
        color = 'orange';
        bgColor = '#fff3e0';
    } else if (status === 'Cancelado') {
        color = 'red';
        bgColor = '#ffe6e6';
    }
    return {
        padding: '5px 10px',
        borderRadius: '15px',
        backgroundColor: bgColor,
        color: color,
        fontWeight: 'bold',
        fontSize: '0.9em'
    };
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    message: {
        textAlign: 'center',
        marginTop: '50px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#282c34',
        color: 'white',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #eee',
        textAlign: 'left',
    },
    tr: {
        cursor: 'pointer',
    },
    detailsButton: {
        padding: '8px 12px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9em',
    }
};

export default OrdersPage;