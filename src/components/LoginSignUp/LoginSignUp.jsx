import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"; 

import './LoginSignUp.css';

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate(); 

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
    mobile: "",
  });

  useEffect(() => {
    if (window.location.hash === "#signup") {
      setActiveTab("signup");
    }
  }, []);

  const handleInputChange = (e, state, setState) => {
    const { name, value, type, checked } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const showAlert = (icon, title, text, timer = 2500) => {
  return Swal.fire({
    icon,
    title,
    text,
    timer,
    showConfirmButton: true,
    customClass: {
      icon: 'swal-icon',
      popup: 'swal-popup',
      title: 'swal-title',
      htmlContainer: 'swal-text',
      confirmButton: 'swal-confirm',
    },
    background: '#F6F2F0',
    color: '#333',
  });
};

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        await showAlert(
          "success",
          "Login Successful",
          `Welcome back, ${data.firstName || loginData.username}`
        );
        navigate("/"); 
      } else {
        showAlert("error", "Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      showAlert("error", "Network Error", "Please try again later.");
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          birthDate: signupData.birthday,
          gender: signupData.gender,
          phone: signupData.mobile,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await showAlert(
          "success",
          "Signup Successful",
          `Welcome ${result.firstName} ${result.lastName}!`,
          3000
        );
        localStorage.setItem("token", "fake-signup-jwt-token");
        navigate("/"); 
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (err) {
      showAlert("error", "Signup Failed", err.message);
    }
  };

  return (
    <>
      <div className='fromWidth form-container min-h-screen flex items-center justify-center' id="auth-section">
        <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-4xl transition-all duration-500 ease-in-out forms">

          {/* Tabs */}
          <div className="forms flex justify-center mb-6 space-x-8 text-lg font-medium">
            <button
              className={`forms transition-colors duration-300 px-3 mx-3 ${activeTab === 'login' ? 'text-black-600 border-b-2 border-black-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
              id="login"
            >
              Login
            </button>
            <button
              className={`forms transition-colors duration-300 px-3 mx-3 ${activeTab === 'signup' ? 'text-black-600 border-b-2 border-black-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('signup')}
              id="signup"
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="forms space-y-6 animate-fade-in">
              <div className='forms login-form'>
                <label className="forms block mb-1 text-lg text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  className="forms background w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={loginData.username}
                  onChange={(e) => handleInputChange(e, loginData, setLoginData)}
                />
              </div>

              <div className='forms'>
                <label className="forms block mb-1 text-lg text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="forms background w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={loginData.password}
                  onChange={(e) => handleInputChange(e, loginData, setLoginData)}
                />
              </div>

              <div className="forms flex items-center justify-between text-sm my-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={loginData.remember}
                    onChange={(e) => handleInputChange(e, loginData, setLoginData)}
                    className="form-checkbox"
                  />
                  <span className="forms text-gray-600">Remember Me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Redirect to forgot password page')}
                  className="text-muted hover:underline forms m-0 "
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="forms w-full background text-black py-3 rounded-md hover:bg-slate-700 transition"
              >
                Login
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="forms space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 gap-6">
                <div className='forms p-0'>
                  <label className="block mb-1 text-lg text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                  />
                </div>

                <div className='forms p-0'>
                  <label className="block mb-1 text-lg text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className='forms'>
                <label className="block mb-1 text-lg text-gray-700">Username</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 forms background py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                />
              </div>

              <div className='forms'>
                <label className="block mb-1 text-lg text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                />
              </div>

              <div className='forms'>
                <label className="block mb-1 text-lg text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className='forms p-0'>
                  <label className="block mb-1 text-lg text-gray-700">Birthday</label>
                  <input
                    type="date"
                    required
                    className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={signupData.birthday}
                    onChange={(e) => setSignupData({ ...signupData, birthday: e.target.value })}
                  />
                </div>

                <div className='forms p-0'>
                  <label className="forms block mb-1 text-lg text-gray-700">Gender</label>
                  <select
                    required
                    className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={signupData.gender}
                    onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className='forms'>
                <label className="forms block mb-1 text-lg text-gray-700">
                  Mobile Number <span className="forms text-sm text-gray-400">(optional)</span>
                </label>
                <input
                  type="tel"
                  className="w-full forms background px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={signupData.mobile}
                  onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                />
              </div>

              <div className='forms'>
                <button
                  type="submit"
                  className="forms w-full background text-black py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </>
  );
};

export default LoginSignUp;