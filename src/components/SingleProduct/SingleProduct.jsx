import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { useCart } from '../CartContext/CartContext';
import Navbar from '../Navbar/navbar';
import Footer from '../footer/footer';
import './SingleProduct.css'; 

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '5.5rem' }}>
        <Row className="align-items-center mb-5">
          <Col md={6} className="text-center mb-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-danger mb-3">${product.price}</h4>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>

            {added ? (
              <div className="added-message animate">✔️ Added to cart!</div>
            ) : (
              <Button variant="success" onClick={handleAddToCart}>
                🛒 Add to Cart
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h5 className="fw-bold mb-3">Leave a Comment</h5>
            <Form>
              <Form.Group controlId="commentTextarea">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={() => alert('Comment submitted!')}>
                Submit Comment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SingleProduct;