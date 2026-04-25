import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import axios from 'axios';
import ProductModal from '../components/ProductModal';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Published');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5001/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const handleTogglePublish = async (product) => {
    try {
      await axios.put(`http://localhost:5001/products/${product._id}`, { ...product, published: !product.published });
      fetchProducts();
    } catch (err) {
       alert("Status update failed");
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'Published' ? p.published : !p.published;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your inventory and product catalog</p>
        </div>
        <button className="btn-primary add-product-btn" onClick={() => handleOpenModal()}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="products-container">
        
        {/* TABS */}
        <div className="tabs-container">
          <div 
            className={`tab ${activeTab === 'Published' ? 'active' : ''}`}
            onClick={() => setActiveTab('Published')}
          >
            Published
          </div>
          <div 
            className={`tab ${activeTab === 'Unpublished' ? 'active' : ''}`}
            onClick={() => setActiveTab('Unpublished')}
          >
            Unpublished
          </div>
        </div>

        {/* SEARCH AND CONTROLS */}
        <div className="table-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* CSS GRID CARDS */}
        <div className="products-grid">
           {filteredProducts.map(product => (
             <div className="product-card" key={product._id}>
                {/* Image */}
                <div className="card-image-box">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="card-img" />
                  ) : (
                    <div className="card-img-placeholder">Not Found</div>
                  )}
                  {/* Dots overlay as per Figma */}
                  <div className="carousel-dots">
                     <span className="dot active"></span>
                     <span className="dot"></span>
                     <span className="dot"></span>
                  </div>
                </div>

                {/* Content */}
                <div className="card-content">
                  <h3 className="card-title">{product.name}</h3>
                  
                  <div className="data-list">
                    <div className="data-row">
                      <span className="data-label">Product type -</span>
                      <span className="data-value">{product.type}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Quantity Stock -</span>
                      <span className="data-value">{product.stock}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">MRP -</span>
                      <span className="data-value">₹ {product.mrp}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Selling Price -</span>
                      <span className="data-value">₹ {product.sellingPrice}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Brand Name -</span>
                      <span className="data-value">{product.brand}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Total Number of Images -</span>
                      <span className="data-value">1</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Exchange Eligibility -</span>
                      <span className="data-value">{product.eligibility}</span>
                    </div>
                  </div>
                </div>
                
                {/* Footer Buttons */}
                <div className="card-footer">
                  <button 
                    className={`btn-publish-toggle ${product.published ? 'btn-unpublish' : 'btn-publish'}`}
                    onClick={() => handleTogglePublish(product)}
                  >
                     {product.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button className="btn-edit" onClick={() => handleOpenModal(product)}>
                     Edit
                  </button>
                  <button className="btn-del" onClick={() => handleDelete(product._id)}>
                     <Trash2 size={16} />
                  </button>
                </div>
             </div>
           ))}
        </div>
        {filteredProducts.length === 0 && (
           <div className="empty-state">
             <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="3" y="3" width="7" height="7" rx="1" />
                   <rect x="14" y="3" width="7" height="7" rx="1" />
                   <rect x="14" y="14" width="7" height="7" rx="1" />
                   <path d="M3 14h7v7H3z" />
                   <path d="M17.5 14v7" />
                   <path d="M14 17.5h7" />
                </svg>
             </div>
             <h3>No {activeTab} Products</h3>
             <p>Your {activeTab} products will appear here.<br/>Create your first product to publish.</p>
           </div>
        )}
      </div>

      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product={editingProduct} 
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
