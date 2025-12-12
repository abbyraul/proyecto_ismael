// src/pages/HomePage.js

import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Bienvenido a la Plataforma de Gestión E-commerce!</h1>
      <p>Este es el sistema central de tu proyecto. Usa la barra de navegación para acceder a los módulos CRUD.</p>
      <div style={{ margin: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2>Requisitos del Proyecto</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>✅ Mínimo 5 Módulos Interrelacionados.</li>
              <li>✅ Cada Módulo con Operaciones CRUD.</li>
              <li>✅ Sistema de Autenticación Funcional.</li>
              <li>✅ Arquitectura N-Capas (Frontend/Backend API REST).</li>
          </ul>
      </div>
    </div>
  );
};

export default HomePage;