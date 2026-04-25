import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link2 } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/auth/login', { emailOrMobile });
      localStorage.setItem('authEmail', emailOrMobile);
      navigate('/verify-otp');
    } catch (err) {
      alert('Error initiating login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          Productr <Link2 className="auth-brand-icon" size={24} strokeWidth={3} />
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Login to your Productr Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email or Phone number</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Acme@gmail.com"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-login">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
