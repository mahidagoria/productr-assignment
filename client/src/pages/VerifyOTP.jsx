import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link2 } from 'lucide-react';
import './Auth.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const emailOrMobile = localStorage.getItem('authEmail');

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    try {
      const res = await axios.post('http://localhost:5001/auth/verify-otp', { emailOrMobile, otp: otpString });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/products'; 
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand" style={{background: 'white'}}>
          Productr <Link2 className="auth-brand-icon" size={24} strokeWidth={3} />
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Verify OTP</h2>
          <form onSubmit={handleVerify}>
            <p style={{textAlign: 'center', marginBottom: 24, fontSize: 14, color: '#475569'}}>
              We sent a code to {emailOrMobile}.<br/>(Use 123456)
            </p>
            <div className="otp-container">
              {otp.map((data, index) => {
                  return (
                    <input
                      className="otp-field"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={e => handleChange(e.target, index)}
                      onFocus={e => e.target.select()}
                    />
                  );
              })}
            </div>
            <button type="submit" className="btn-login" style={{marginTop: 32}}>Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
