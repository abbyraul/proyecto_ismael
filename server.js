// proyectoweb-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno del archivo .env
dotenv.config();

// ----------------------------------------------------
// ⚠️ IMPRESIONES DE PRUEBA (Quitar después de verificar)
// ----------------------------------------------------
console.log('--- VERIFICACIÓN DE ENTORNO ---');
console.log('PORT cargado:', process.env.PORT);
console.log('MONGODB_URI cargada:', process.env.MONGODB_URI);
// Para JWT_SECRET, muestra solo una parte por seguridad
const secret = process.env.JWT_SECRET;
console.log('JWT_SECRET cargada:', secret ? secret.substring(0, 10) + '...' : '❌ NO CARGADA');
console.log('-------------------------------');
// ----------------------------------------------------

const app = express();
// ... el resto del código ...