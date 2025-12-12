// src/pages/clients/ClientProfilePage.js

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientProfilePage = () => {
    // Obtener la información del usuario logueado y la función de logout
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Redirigir si no hay usuario (aunque ProtectedRoute ya debería manejar esto)
    if (!user) {
        return <h2 style={styles.message}>Cargando perfil o error de autenticación...</h2>;
    }

    const handleLogout = () => {
        logout(); // Llama a la función de cierre de sesión del contexto
        navigate('/login'); // Redirige al inicio de sesión
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>M3: Mi Perfil de Cliente</h1>
                <button 
                    onClick={handleLogout} 
                    style={styles.logoutButton}
                >
                    Cerrar Sesión
                </button>
            </div>
            <p style={styles.subtitle}>Información detallada de la cuenta y opciones personales.</p>

            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Datos Personales</h2>
                <div style={styles.infoGrid}>
                    <p style={styles.label}>Nombre:</p>
                    <p style={styles.value}>{user.name || 'N/A'}</p>
                    
                    <p style={styles.label}>Email:</p>
                    <p style={styles.value}>{user.email}</p>
                    
                    <p style={styles.label}>Rol:</p>
                    <p style={styles.value}>{user.role === 'admin' ? 'Administrador' : 'Cliente Estándar'}</p>
                    
                    <p style={styles.label}>ID de Usuario:</p>
                    <p style={styles.value}>{user.id}</p>
                </div>
            </div>

            <div style={{...styles.card, marginTop: '20px'}}>
                <h2 style={styles.sectionTitle}>Panel de Control</h2>
                <div style={styles.controlPanel}>
                    {/* Botón de ejemplo para clientes */}
                    <ProfileButton 
                        text="Mis Compras/Historial de Pedidos"
                        onClick={() => alert('Pendiente de implementar: Lista de pedidos del cliente.')}
                    />
                    
                    {/* Botón de ejemplo para administradores */}
                    {user.role === 'admin' && (
                        <ProfileButton 
                            text="Ir al Panel de Administración"
                            color="#007bff"
                            onClick={() => navigate('/admin/productos')}
                        />
                    )}

                    <ProfileButton 
                        text="Editar Contraseña"
                        color="#ffc107"
                        onClick={() => alert('Pendiente de implementar: Formulario de cambio de contraseña.')}
                    />
                </div>
            </div>
        </div>
    );
};

// --- Componente Auxiliar: Botón de Panel ---
const ProfileButton = ({ text, onClick, color = '#6c757d' }) => (
    <button 
        onClick={onClick}
        style={{...styles.panelButton, backgroundColor: color}}
    >
        {text}
    </button>
);


// --- Estilos ---
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        color: '#343a40',
        fontSize: '2em',
    },
    subtitle: {
        color: '#6c757d',
        marginBottom: '30px',
        fontSize: '1.1em',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px',
    },
    message: {
        textAlign: 'center',
        marginTop: '50px',
        color: '#dc3545',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        color: '#007bff',
        borderBottom: '2px solid #007bff20',
        paddingBottom: '5px',
        marginBottom: '15px',
        fontSize: '1.5em',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '10px 20px',
        fontSize: '1em',
    },
    label: {
        fontWeight: 'bold',
        color: '#495057',
        textAlign: 'right',
    },
    value: {
        color: '#212529',
    },
    controlPanel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '10px',
    },
    panelButton: {
        padding: '12px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'opacity 0.2s',
        textAlign: 'center',
    },
    logoutButton: {
        padding: '8px 15px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    },
};

export default ClientProfilePage;