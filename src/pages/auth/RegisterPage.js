// src/pages/auth/RegisterPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importamos el contexto de autenticación

const RegisterPage = () => {
    // 1. Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Añadimos el campo de nombre
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Obtener la función de registro del contexto
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password || !name) {
            setError("Todos los campos son obligatorios.");
            setLoading(false);
            return;
        }

        try {
            // Llamar a la función 'register' del AuthContext
            await register(email, password, name);
            
            // Si el registro es exitoso (simulado), redirigir al perfil o al inicio
            alert("¡Registro exitoso! Ya has iniciado sesión.");
            navigate('/perfil'); // Redirige a la página de perfil del cliente (M3)

        } catch (err) {
            // Manejar errores de registro (ej: usuario ya existe)
            setError(err.message || 'Error durante el registro. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Crear Cuenta (Registro)</h1>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    {/* Campo Nombre */}
                    <label htmlFor="name" style={styles.label}>Nombre Completo:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                        disabled={loading}
                    />

                    {/* Campo Email */}
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                        disabled={loading}
                    />

                    {/* Campo Contraseña */}
                    <label htmlFor="password" style={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                        disabled={loading}
                    />

                    {/* Mensaje de Error */}
                    {error && <p style={styles.error}>{error}</p>}

                    <button 
                        type="submit" 
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarme'}
                    </button>
                </form>

                <p style={styles.linkText}>
                    ¿Ya tienes una cuenta? <Link to="/login" style={styles.link}>Inicia Sesión aquí</Link>
                </p>
            </div>
        </div>
    );
};

// --- Estilos ---
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f4f7f6',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '25px',
        fontSize: '1.8em',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1em',
    },
    error: {
        color: '#dc3545',
        marginBottom: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1.1em',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    linkText: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '0.9em',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default RegisterPage;