// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 

// URL base de tu Backend
const API_URL = 'http://localhost:8080/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // user contendrá { id, name, email, role }
    const [user, setUser] = useState(null); 
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Efecto para intentar cargar el token/usuario al iniciar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            // Simulación simple de carga de usuario desde el token
            // En una app real, harías una llamada GET /api/auth/user para obtener datos frescos.
            
            // Para fines de prueba, si hay token, asumimos un rol de admin por ahora
            // (Reemplazar con la lógica de decodificación o llamada a API real si la tienes)
            setUser({ id: 'temp', name: 'Usuario Temporal', email: 'a@a.com', role: 'admin' });
        }
        setLoading(false);
    }, []);


    // ----------------------------------------------------------------------
    // 🟢 FUNCIÓN DE LOGIN (Llama al Backend real)
    // ----------------------------------------------------------------------
    const login = async (email, password) => {
        try {
            // Realiza la llamada POST a tu endpoint de Node.js
            const response = await axios.post(`${API_URL}/login`, { email, password });
            
            const { token, user } = response.data;
            
            // 1. Guardar el token en localStorage para mantener la sesión
            localStorage.setItem('token', token);
            
            // 2. Actualizar el estado del contexto
            setUser(user);
            setAuthToken(token);
            
            return true; // Éxito
        } catch (error) {
            // Manejo de errores (por ejemplo, credenciales inválidas 400)
            const errorMsg = error.response?.data?.msg || 'Error de conexión o credenciales inválidas.';
            console.error('Error de login:', errorMsg);
            throw new Error(errorMsg);
        }
    };

    // ----------------------------------------------------------------------
    // 🟢 FUNCIÓN DE REGISTRO (Llama al Backend real)
    // ----------------------------------------------------------------------
    const register = async (name, email, password) => {
        try {
            // Realiza la llamada POST a tu endpoint de Node.js
            const response = await axios.post(`${API_URL}/register`, { name, email, password });
            
            const { token, user } = response.data;
            
            // 1. Guardar el token en localStorage
            localStorage.setItem('token', token);
            
            // 2. Actualizar el estado del contexto
            setUser(user);
            setAuthToken(token);
            
            return true; // Éxito
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Error de conexión o el usuario ya existe.';
            console.error('Error de registro:', errorMsg);
            throw new Error(errorMsg);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setAuthToken(null);
        // La aplicación React Router se encargará de la redirección
    };

    // Función clave para ProtectedRoute
    const isAdmin = user && user.role === 'admin'; 

    return (
        <AuthContext.Provider value={{ user, authToken, login, logout, register, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);