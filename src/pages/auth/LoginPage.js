// src/pages/auth/LoginPage.js

import React, { useState } from 'react';
// ⬅️ Importamos useAuth para acceder a las funciones de login
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // 1. Obtener las funciones y estados del contexto global
    const { login, loading } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Limpiar errores anteriores

        try {
            // 2. Llamar a la función 'login' del AuthContext
            await login(email, password);
            
            // 3. Si el login es exitoso, redirigir al inicio (o al dashboard de admin)
            navigate('/'); 
        } catch (error) {
            // 4. Si hay un error (ej: credenciales inválidas), mostrarlo
            setLoginError(error.message || "Fallo al iniciar sesión. Inténtalo de nuevo.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Iniciar Sesión</h1>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input 
                    type="email" 
                    id="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="admin@tienda.com o cliente@tienda.com"
                    style={styles.input}
                    required 
                />
                
                <label htmlFor="password" style={styles.label}>Contraseña:</label>
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña: 123456"
                    style={styles.input}
                    required 
                />

                {/* Mostrar el error de autenticación si existe */}
                {loginError && <p style={styles.errorText}>Error: {loginError}</p>}
                
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Ingresando...' : 'Entrar'}
                </button>
            </form>
            <p style={styles.registerLink}>
                ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '400px', margin: '50px auto' },
    header: { textAlign: 'center', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' },
    label: { marginTop: '10px', fontWeight: 'bold' },
    input: { padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' },
    button: { padding: '12px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' },
    errorText: { color: 'red', textAlign: 'center', marginBottom: '10px' },
    registerLink: { textAlign: 'center', marginTop: '20px' }
};

export default LoginPage;