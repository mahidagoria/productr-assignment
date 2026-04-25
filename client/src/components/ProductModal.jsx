import React, { useState } from 'react';
import axios from 'axios';
import { X, UploadCloud } from 'lucide-react';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, product, onSuccess }) => {
  const isEdit = !!product;
  const [formData, setFormData] = useState(
    product || {
      name: '',
      brand: '',
      type: '',
      stock: '',
      mrp: '',
      sellingPrice: '',
      eligibility: 'Exchange',
      imageUrl: ''
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5001/products/${product._id}`, formData);
      } else {
        await axios.post('http://localhost:5001/products', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button type="button" className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group grid-col-2">
              <label>Product Name</label>
              <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Brand</label>
              <input type="text" name="brand" className="input-field" value={formData.brand} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Type</label>
              <input type="text" name="type" className="input-field" value={formData.type} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" className="input-field" value={formData.stock} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>MRP ($)</label>
              <input type="number" name="mrp" className="input-field" value={formData.mrp} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Selling Price ($)</label>
              <input type="number" name="sellingPrice" className="input-field" value={formData.sellingPrice} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Eligibility</label>
              <select name="eligibility" className="input-field" value={formData.eligibility} onChange={handleChange}>
                <option value="Exchange">Exchange</option>
                <option value="Return">Return</option>
                <option value="None">None</option>
              </select>
            </div>
            
            <div className="form-group grid-col-2">
              <label>Image URL</label>
              <div className="image-upload-area">
                <UploadCloud size={24} style={{color: '#6B7280', marginBottom: 8}} />
                <p style={{fontSize: 12, color: '#6B7280', marginBottom: 12}}>Paste an image URL below</p>
                <input type="text" name="imageUrl" className="input-field" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
