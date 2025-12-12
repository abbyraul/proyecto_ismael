// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente que verifica si el usuario tiene permiso para acceder a una ruta.
 * * @param {object} children - El componente que se quiere renderizar (ej: <OrdersPage />).
 * @param {boolean} requiresAdmin - Indica si la ruta solo es accesible para administradores.
 */
const ProtectedRoute = ({ children, requiresAdmin = false }) => {
    
    // Obtener el estado del usuario logueado desde el contexto
    const { isLoggedIn, isAdmin, loading } = useAuth();
    
    // Si la aplicación está cargando el estado de autenticación (ej: revisando localStorage)
    if (loading) {
        return <h2 style={{textAlign: 'center', marginTop: '100px'}}>Cargando sesión...</h2>;
    }

    // 1. Verificar si el usuario está logueado
    if (!isLoggedIn) {
        // Si no está logueado, redirigir a la página de Login
        return <Navigate to="/login" replace />;
    }

    // 2. Verificar si se requieren permisos de administrador
    if (requiresAdmin && !isAdmin) {
        // Si se requieren permisos de administrador y el usuario no los tiene,
        // redirigir a la página de inicio (o mostrar un mensaje de error 403)
        return <Navigate to="/" replace />;
    }

    // Si todas las comprobaciones pasan, renderizar el componente solicitado
    return children;
};

export default ProtectedRoute;