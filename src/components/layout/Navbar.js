// src/components/layout/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ⬅️ Importamos useAuth para acceder al estado global de la sesión
import { useAuth } from '../../context/AuthContext'; 

const Navbar = () => {
    // 1. Obtener los estados y funciones de autenticación
    const { isLoggedIn, isAdmin, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función de logout del AuthContext
        navigate('/'); // Redirige al inicio después de cerrar sesión
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.brand}>
                <Link to="/" style={styles.navLink}>
                    E-COMMERCE WEB
                </Link>
            </div>
            <div style={styles.links}>
                {/* Enlace de Catálogo Público (Visible siempre) */}
                <Link to="/catalogo" style={styles.navLink}>
                    Catálogo
                </Link>

                {/* 2. Rutas de Administración (Solo visibles para Admins) */}
                {isAdmin && (
                    <>
                        <Link to="/admin/productos" style={styles.navLink}>
                            M1 Prod (Admin)
                        </Link>
                        <Link to="/admin/pedidos" style={styles.navLink}>
                            M2 Pedidos (Admin)
                        </Link>
                        <Link to="/admin/inventario" style={styles.navLink}>
                            M4 Inventario
                        </Link>
                        <Link to="/admin/reportes" style={styles.navLink}>
                            M5 Reportes
                        </Link>
                    </>
                )}
                
                {/* 3. Renderizado Condicional basado en el estado de LOGIN */}
                {isLoggedIn ? (
                    // --- SI ESTÁ LOGUEADO ---
                    <>
                        {/* M3 Perfil del Cliente */}
                        <Link to="/perfil" style={styles.navLink}>
                            Hola, {user.email.split('@')[0]}
                        </Link>
                        <Link to="/perfil" style={styles.navLink}>
                            Mi Perfil (M3)
                        </Link>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    // --- SI NO ESTÁ LOGUEADO ---
                    <>
                        <Link to="/login" style={styles.navLink}>
                            Login
                        </Link>
                        <Link to="/registro" style={styles.navLink}>
                            Registro
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#282c34', // Fondo oscuro (similar a la app de React)
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    brand: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1em',
        padding: '5px 10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    logoutButton: {
        padding: '8px 15px',
        backgroundColor: '#dc3545', // Rojo para el botón de salir
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
    }
};

export default Navbar;