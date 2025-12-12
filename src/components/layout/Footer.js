// src/components/layout/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Proyecto Tiendita. Trabajo en ecuipo.</p>
      <p>Módulos: Productos, Pedidos, Clientes, Inventario, Reportes.</p>
    </footer>
  );
};

const styles = {
    footer: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#eee',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        fontSize: '0.8em'
    }
}

export default Footer;