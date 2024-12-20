import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import ProductCard from '../components/ProductCard/ProductCard';  // Updated import path

const Homepage = () => {
  const { user } = useUser();

  // Sample product data
  const products = [
    {
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      name: "Smart Fitness Watch",
      price: 149.99,
      originalPrice: 179.99,
      discount: 15,
      rating: 4.8,
      reviews: 256,
      inStock: true
    },
    {
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.3,
      reviews: 89,
      inStock: false
    },
    {
      name: "Wireless Earbuds",
      price: 129.99,
      originalPrice: 159.99,
      discount: 10,
      rating: 4.6,
      reviews: 173,
      inStock: true
    }
  ];

  return (
    <Container className="py-5">
      {user && (
        <div className="welcome-banner mb-4 bg-light p-4 rounded">
          <h2 className="mb-0">Welcome back, {user.name}! 👋</h2>
        </div>
      )}
      
      <h3 className="mb-4">Featured Products</h3>
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product, idx) => (
          <Col key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;