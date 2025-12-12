// src/pages/products/ProductsPage.js

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función que llama al servicio para obtener los datos
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los productos. " + err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  if (loading) {
    return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Cargando productos...</h2>;
  }

  if (error) {
    return <h2 style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>⚠️ {error}</h2>;
  }
  
  // Vista principal del Catálogo
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Catálogo de Productos</h1>
      
      {products.length === 0 ? (
          <p style={{textAlign: 'center'}}>No hay productos disponibles en este momento.</p>
      ) : (
          <div style={styles.productList}>
              {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
          </div>
      )}
    </div>
  );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#282c34'
    },
    productList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}

export default ProductsPage;