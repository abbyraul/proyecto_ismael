// src/components/ProductCard.js

import React from 'react';

const ProductCard = ({ product }) => {
  const { name, price, stock, description } = product;

  return (
    <div style={styles.card}> {/* Usa 'styles' aquí */}
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.price}>${price.toFixed(2)}</p>
      <p style={styles.stock}>Stock: {stock}</p>
      <p style={styles.description}>{description}</p>
      <button style={styles.button}>Ver Detalle</button>
    </div>
  );
};



// ⬅️ ¡ESTE BLOQUE DE ESTILOS ESTABA FALTANDO! ⬅️
const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: '1.2em',
        color: '#333',
        marginBottom: '5px',
    },
    price: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '10px',
    },
    stock: {
        fontSize: '0.9em',
        color: 'green', // Estilo fijo, para la verificación de stock se puede hacer más complejo
        marginBottom: '10px',
    },
    description: {
        fontSize: '0.9em',
        color: '#666',
        marginBottom: '15px',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default ProductCard; // Asegúrate de que esto también esté ahí