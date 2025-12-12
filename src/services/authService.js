// src/services/authService.js

const API_AUTH_URL = 'http://localhost:8080/api/auth';

/**
 * Simula el inicio de sesión.
 */
export const login = async (email, password) => {
    // 🟢 SIMULACIÓN: Validación simple.
    if (email === 'admin@tienda.com' && password === '123456') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsImlzQWRtaW4iOnRydWV9';
        const user = { email: email, isAdmin: true, id: 'admin' };
        
        // En producción, aquí se haría un fetch(API_AUTH_URL/login, { method: 'POST', body: ... })
        return new Promise(resolve => 
            setTimeout(() => resolve({ token: mockToken, user: user }), 700)
        );
    } else if (email === 'cliente@tienda.com' && password === '123456') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpc0FkbWluIjpmYWxzZX0';
        const user = { email: email, isAdmin: false, id: 'client' };
        
        return new Promise(resolve => 
            setTimeout(() => resolve({ token: mockToken, user: user }), 700)
        );
    } else {
        // En producción, esto sería un throw new Error si el response.status es 401
        return new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Credenciales inválidas")), 700)
        );
    }
};

/**
 * Simula el registro de un nuevo usuario.
 */
export const register = async (userData) => {
    // 🟢 SIMULACIÓN: Devuelve los datos del nuevo usuario.
    console.log("Simulando registro de nuevo usuario:", userData);

    return new Promise(resolve => 
        setTimeout(() => resolve({ id: 'new_user_123', ...userData }), 1000)
    );
};

/**
 * Elimina el token del almacenamiento local (Logout).
 */
export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
};