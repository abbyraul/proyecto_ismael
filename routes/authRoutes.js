// proyectoweb-backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// ... (El endpoint de REGISTRO que ya creamos) ...

// ------------------------------------------------------------------
// 2. ENDPOINT DE LOGIN: POST /api/auth/login
// ------------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar que el usuario exista
        let user = await User.findOne({ email });
        if (!user) {
            // Usamos 400 (Bad Request) para no dar pistas de si el usuario existe o no
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // 2. Comparar la contraseña ingresada con el hash guardado en la BD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // 3. Crear el JWT (Token de Autenticación)
        const payload = {
            user: {
                id: user.id,
                role: user.role // Esto es crucial para ProtectedRoute en el Frontend
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'mi_secreto_super_seguro', 
            { expiresIn: '1h' }, // El token expira en 1 hora
            (err, token) => {
                if (err) throw err;
                // 4. Devolver el token (para la sesión) y los datos del usuario
                res.json({ 
                    token, 
                    user: { 
                        id: user.id, 
                        name: user.name, 
                        email: user.email, 
                        role: user.role 
                    } 
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;