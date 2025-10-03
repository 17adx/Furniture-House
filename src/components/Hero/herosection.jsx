import React from 'react';
import { useNavigate } from 'react-router-dom';
import './herosection.css';
import Picture from '../../assets/imgs/1st.jpg'; // Adjust path if needed

const HeroSection = () => {
   const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login#signup');
  };

  return (
    <>
      <div className='container m-auto'>
        <div className="px-4 pt-5 my-5 text-center border-bottom">
          <h1 className="h1h1 display-4 fw-bold">Welcome to Furniture House<br/><span className="h1span">Where Comfort Meets Style.</span></h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Discover timeless designs and modern comfort with our exclusive collection of handcrafted furniture.
              Whether you’re furnishing a cozy living room, a chic dining area, or a restful bedroom, we bring elegance and durability into every corner of your home.
              Explore our premium selections today and transform your space into something extraordinary.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <button className="btn btn-primary btn-lg px-4 me-sm-3 text-dark" onClick={handleLoginClick}>
                Login
              </button>
              <button className="btn btn-outline-secondary btn-lg px-4 text-muted" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
            <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
              <div className="container px-5">
                <img
                  src={Picture}
                  className="img-fluid border rounded-3 shadow-lg mb-4 m-auto"
                  alt="Example image"
                  width="700"
                  height="500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;