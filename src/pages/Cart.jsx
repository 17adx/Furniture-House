import React, { useState } from 'react';
import { FaThList, FaThLarge } from 'react-icons/fa';
import { useCart } from '../components/CartContext/CartContext';
import {
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  InputGroup,
  Alert,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/footer/footer';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [layout, setLayout] = useState('grid');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [message, setMessage] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 100 ? 0 : 10;
  const discount = appliedCoupon === 'SAVE10' ? 0.1 * subtotal : 0;
  const total = subtotal - discount + shipping;

  const handleLayoutChange = (val) => setLayout(val);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setAppliedCoupon('SAVE10');
      setMessage('Coupon applied: 10% discount!');
    } else {
      setAppliedCoupon(null);
      setMessage('Invalid coupon code.');
    }
  };

  return (
    <>
      <div className="page-container">
        <main className="content-wrap">
          <Navbar />
          <Container className="cart-wrapper">
            <Row className="align-items-center mb-3">
              <Col>
                <h2>🛒 Shopping Cart</h2>
              </Col>
              <Col xs="auto">
                <ToggleButtonGroup
                  type="radio"
                  name="layoutOptions"
                  value={layout}
                  onChange={handleLayoutChange}
                >
                  <ToggleButton
                    id="grid-view"
                    value="grid"
                    className={`layout-toggle ${layout === 'grid' ? 'active-layout' : 'inactive-layout'}`}
                  >
                    <FaThLarge className="me-2" /> Grid
                  </ToggleButton>
                  <ToggleButton
                    id="list-view"
                    value="list"
                    className={`layout-toggle ${layout === 'list' ? 'active-layout' : 'inactive-layout'}`}
                  >
                    <FaThList className="me-2" /> List
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div
                className={`cart-items ${
                  layout === 'grid' ? 'grid-layout' : 'list-layout'
                }`}
              >
                {cartItems.map(item => (
                  <Card key={item.id} className="cart-card">
                    <Row className="g-0 align-items-center">
                      <Col xs={layout === 'grid' ? 12 : 3} className="img-col">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="cart-img"
                        />
                      </Col>
                      <Col xs={layout === 'grid' ? 12 : 9}>
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text className="text-muted">{item.description}</Card.Text>
                          <p className="price">Price: ${item.price.toFixed(2)}</p>

                          <div className="quantity-controls">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              −
                            </Button>
                            <span className="qty">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </Button>
                            <span className="total">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                          </div>

                          <p className="info">
                            Category: {item.category} • Brand: {item.brand}
                          </p>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="checkout-section">
                <InputGroup className="coupon-group">
                  <Form.Control
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </InputGroup>

                {message && (
                  <Alert variant={appliedCoupon ? 'success' : 'danger'}>{message}</Alert>
                )}

                <div className="totals">
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p>Discount: -${discount.toFixed(2)}</p>
                  <p>Shipping: {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                  <h4>Total: ${total.toFixed(2)}</h4>
                  <Button variant="success" size="lg" className="checkout-btn">
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </main>
        <Footer />
      </div>
      
    </>
  );
};

export default Cart;