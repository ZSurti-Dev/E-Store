import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    name = "Premium Wireless Headphones",
    price = 199.99,
    originalPrice = 249.99,
    discount = 20,
    image = "/api/placeholder/300/300",
    rating = 4.5,
    reviews = 128,
    inStock = true
  } = product || {};

  return (
    <Card className="h-100 product-card border-0 shadow-sm">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image} 
          className="p-3"
          alt={name}
        />
        <Button 
          variant="light" 
          className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
          style={{ width: '40px', height: '40px' }}
        >
          <Heart size={20} />
        </Button>
        {discount > 0 && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 start-0 m-2"
          >
            {discount}% OFF
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{name}</Card.Title>
        
        <div className="mb-2">
          <span className="h5 text-primary mb-0">${price}</span>
          {originalPrice > price && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${originalPrice}
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="text-warning">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </div>
            <small className="text-muted">({reviews})</small>
          </div>
        </div>
        
        <Button 
          variant={inStock ? "primary" : "secondary"}
          className="mt-auto"
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;