// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ⬅️ Componente Guardián (Esencial para la seguridad)
import ProtectedRoute from './components/ProtectedRoute'; 

// --- Componentes de Diseño (Layout) ---
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// --- Páginas / Módulos ---
// Autenticación
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'; // ⬅️ ¡Incluido!
// Vistas Públicas/Home
import HomePage from './pages/HomePage';
// Módulos Admin y Cliente
import ProductsPage from './pages/products/ProductsPage'; // M1
import OrdersPage from './pages/orders/OrdersPage';       // M2
import OrderDetailsPage from './pages/orders/OrderDetailsPage'; // M2 Detalle
import ClientProfilePage from './pages/clients/ClientProfilePage'; // M3
import InventoryPage from './pages/inventory/InventoryPage'; // M4
import ReportsPage from './pages/reports/ReportsPage';       // M5

function App() {
    return (
        <BrowserRouter>
            {/* Navbar siempre visible para la navegación */}
            <Navbar /> 
            
            <Routes>
                
                {/* === RUTAS PÚBLICAS === */}
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogo" element={<ProductsPage isPublic={true} />} />
                
                {/* === RUTAS DE AUTENTICACIÓN === */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                
                {/* ========================================================= */}
                {/* 🛡️ RUTAS PROTEGIDAS PARA ADMINISTRADORES (requiresAdmin=true) */}
                {/* ========================================================= */}
                
                {/* M1: Productos (CRUD Administrativo) */}
                <Route path="/admin/productos" element={
                    <ProtectedRoute requiresAdmin={true}>
                        <ProductsPage />
                    </ProtectedRoute>
                } />
                
                {/* M2: Pedidos (Lista y Detalle) */}
                <Route path="/admin/pedidos" element={
                    <ProtectedRoute requiresAdmin={true}>
                        <OrdersPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/pedidos/:id" element={
                    <ProtectedRoute requiresAdmin={true}>
                        <OrderDetailsPage />
                    </ProtectedRoute>
                } />
                
                {/* M4: Inventario */}
                <Route path="/admin/inventario" element={
                    <ProtectedRoute requiresAdmin={true}>
                        <InventoryPage />
                    </ProtectedRoute>
                } />
                
                {/* M5: Reportes */}
                <Route path="/admin/reportes" element={
                    <ProtectedRoute requiresAdmin={true}>
                        <ReportsPage />
                    </ProtectedRoute>
                } />
                
                {/* ========================================================= */}
                {/* 👤 RUTA PROTEGIDA PARA CLIENTES LOGUEADOS */}
                {/* ========================================================= */}
                
                {/* M3: Perfil (Solo requiere estar logueado) */}
                <Route path="/perfil" element={
                    <ProtectedRoute> {/* Por defecto, requiresAdmin es false */}
                        <ClientProfilePage />
                    </ProtectedRoute>
                } />

                {/* Ruta 404 (Siempre al final) */}
                <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404: Página No Encontrada</h1>} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;