// src/pages/reports/ReportsPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ IMPORTACIÓN NECESARIA
// Reutilizamos datos simulados de los otros módulos
import inventoryService from '../../services/inventoryService'; 
import { getAllOrders } from '../../services/orderService';
// Nota: En una aplicación real, usarías un servicio específico de Reportes.

const ReportsPage = () => {
    const [reportData, setReportData] = useState({
        totalSales: 0,
        pendingOrders: 0,
        lowStockItems: 0,
        monthlyRevenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Simulación de 12 meses
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateReports = async () => {
            setLoading(true);
            try {
                // --- 1. Obtener Datos de Inventario (M4) ---
                // Aquí debes asegurar que 'inventoryService' esté definido y sea accesible
                const inventory = await inventoryService.getInventory();
                const lowStockItems = inventory.filter(item => item.stock <= item.minStock).length;

                // --- 2. Obtener Datos de Pedidos (M2) ---
                // Aquí debes asegurar que 'getAllOrders' esté definido y sea accesible
                const orders = await getAllOrders();
                
                let totalSales = 0;
                let pendingOrders = 0;
                
                // Simulación de Cálculo de Ventas y Pedidos Pendientes
                orders.forEach(order => {
                    totalSales += order.total;
                    if (order.status !== 'Entregado' && order.status !== 'Cancelado') {
                        pendingOrders++;
                    }
                });

                // Simulación de Ingresos Mensuales
                const mockRevenue = [12500, 15000, 18000, 14000, 22000, 28000, 31000, 25000, 29000, 35000, 41000, 50000];

                setReportData({
                    totalSales: totalSales,
                    pendingOrders: pendingOrders,
                    lowStockItems: lowStockItems,
                    monthlyRevenue: mockRevenue,
                });

            } catch (error) {
                console.error("Error al generar reportes:", error);
                // Si falla, al menos muestra 0 para que la interfaz cargue
                setReportData({ totalSales: 0, pendingOrders: 0, lowStockItems: 0, monthlyRevenue: [] });
            } finally {
                setLoading(false);
            }
        };

        generateReports();
    }, []);

    if (loading) {
        return <h2 style={styles.message}>Generando reportes...</h2>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>M5: Panel de Reportes y Métricas</h1>
            <p style={styles.subtitle}>Métricas clave para la toma de decisiones.</p>

            {/* Tarjetas de Métricas Principales */}
            <div style={styles.kpiContainer}>
                <ReportCard 
                    title="Ventas Totales (Sim.)"
                    value={`$${reportData.totalSales.toFixed(2)}`}
                    color="#4CAF50" // Verde
                />
                <ReportCard 
                    title="Pedidos Pendientes"
                    value={reportData.pendingOrders}
                    color="#FF9800" // Naranja
                />
                <ReportCard 
                    title="Productos con Stock Bajo"
                    value={reportData.lowStockItems}
                    color="#F44336" // Rojo
                    link="/admin/inventario"
                />
            </div>
            
            <h2 style={styles.sectionTitle}>Tendencia de Ingresos Mensuales</h2>
            
            {/* Visualización Simple del Gráfico (Simulación) */}
            <RevenueChart data={reportData.monthlyRevenue} />

            <h2 style={styles.sectionTitle}>Reporte Detallado</h2>
            <p style={styles.detailedReport}>Aquí se cargarían tablas de productos más vendidos, rendimiento por cliente, etc. (Usando M1, M2 y M3).</p>
        </div>
    );
};

// --- Componente Auxiliar: Tarjeta de Métrica (ReportCard) ---
const ReportCard = ({ title, value, color, link }) => {
    // Usamos useNavigate aquí
    const navigate = useNavigate(); 

    return (
        <div 
            style={{ ...styles.card, borderLeft: `5px solid ${color}`, cursor: link ? 'pointer' : 'default' }}
            onClick={() => link && navigate(link)}
        >
            <p style={styles.cardTitle}>{title}</p>
            <h2 style={styles.cardValue}>{value}</h2>
        </div>
    );
};

// --- Componente Auxiliar: Gráfico de Ingresos (Simulación) ---
const RevenueChart = ({ data }) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const maxValue = Math.max(...data);

    return (
        <div style={styles.chartContainer}>
            <div style={styles.chart}>
                {data.map((value, index) => (
                    <div key={index} style={styles.barWrapper}>
                        <div 
                            title={`$${value}`}
                            style={{
                                ...styles.bar,
                                height: `${(value / maxValue) * 100}%`,
                                backgroundColor: '#00bcd4',
                            }}
                        ></div>
                        <span style={styles.barLabel}>{months[index]}</span>
                    </div>
                ))}
            </div>
            <p style={{textAlign: 'center', marginTop: '10px', color: '#666'}}>Escala: ${maxValue.toLocaleString()} (Máximo)</p>
            
        </div>
    );
};

// --- Estilos ---
const styles = {
    container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
    title: { textAlign: 'center', color: '#333', marginBottom: '10px' },
    subtitle: { textAlign: 'center', color: '#666', marginBottom: '30px' },
    message: { textAlign: 'center', marginTop: '50px' },
    kpiContainer: { display: 'flex', justifyContent: 'space-around', gap: '20px', marginBottom: '40px' },
    card: {
        flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center', transition: 'transform 0.2s',
    },
    cardTitle: { fontSize: '1em', color: '#666', margin: '0 0 5px 0' },
    cardValue: { fontSize: '2em', fontWeight: 'bold', margin: 0 },
    sectionTitle: { marginTop: '40px', borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#333' },
    detailedReport: { color: '#999', textAlign: 'center', padding: '50px', border: '1px dashed #ddd', marginTop: '20px' },
    chartContainer: { padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    chart: { display: 'flex', alignItems: 'flex-end', height: '250px', borderBottom: '1px solid #ccc', justifyContent: 'space-around', paddingBottom: '10px' },
    barWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '6%' },
    bar: { width: '100%', transition: 'height 0.5s' },
    barLabel: { fontSize: '0.8em', color: '#333', marginTop: '5px' }
};

export default ReportsPage;