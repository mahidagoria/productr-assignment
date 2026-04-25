require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/productr';

const Product = require('./models/Product');

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seeder for Sample Data (as requested)
    const productCount = await Product.countDocuments();
    if (productCount <= 4) { // Replace initial ones if present
      await Product.deleteMany({}); // Wipe the old non-flagged ones for testing smoothly
      console.log('Inserting new sample data matching Figma...');
      await Product.insertMany([
        { name: 'CakeZone Walnut Brownie', brand: 'CakeZone', type: 'Food', stock: 200, mrp: 2000, sellingPrice: 2000, eligibility: 'YES', imageUrl: 'https://images.unsplash.com/photo-1606357416489-0aeaf47fbb64?w=400&q=80', published: true },
        { name: 'CakeZone Choco Fudge Brownie', brand: 'CakeZone', type: 'Food', stock: 200, mrp: 23, sellingPrice: 80, eligibility: 'YES', imageUrl: 'https://images.unsplash.com/photo-1599598425947-3300bfcc7370?w=400&q=80', published: false },
        { name: 'Theobroma Christmas Cake', brand: 'CakeZone', type: 'Food', stock: 200, mrp: 23, sellingPrice: 80, eligibility: 'YES', imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80', published: true }
      ]);
      console.log('Sample data added successfully!');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
