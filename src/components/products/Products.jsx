import './products.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = ({ selectedCategory }) => {
  const PRODUCTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProductId, setAddedProductId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productData = [];

        if (!selectedCategory || selectedCategory === 'all') {
          const [furnitureRes, decorRes] = await Promise.all([
            axios.get('https://dummyjson.com/products/category/furniture'),
            axios.get('https://dummyjson.com/products/category/home-decoration'),
          ]);
          productData = [...furnitureRes.data.products, ...decorRes.data.products];
        } else {
          const res = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
          productData = res.data.products;
        }

        setProducts(productData);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <div className="container small-screen">
        <h3 className="fw-bold fs-3 mx-5 small-screen-h3">Products:</h3>
        <div className="small-screen d-flex flex-wrap gap-4 justify-content-center  p-3 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentProducts.map((product) => (
              <Card className='small-card' key={product.id} style={{ width: '18rem', cursor: 'pointer' }}>
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={product.title}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <Card.Body onClick={() => navigate(`/product/${product.id}`)}>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-truncate">{product.description}</Card.Text>
                  <Card.Text className="fw-bold fs-5">
                    <strong>Price: ${product.price}</strong>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  {addedProductId === product.id ? (
                    <div className="added-message animate">✔️ Added to cart!</div>
                  ) : (
                    <div className="d-flex flex-column align-items-center gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(product.id, -1)}
                        >
                          –
                        </Button>
                        <span className="fw-bold px-2">{quantities[product.id] || 1}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="primary"
                        className="mt-2"
                        onClick={() => handleAddToCart(product)}
                        style={{ color: 'black' }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </Card.Footer>
              </Card>
            ))
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'black' : 'outline-secondary'}
              className="mx-1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;