const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  stock: { type: Number, required: true },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  eligibility: { type: String, required: true },
  imageUrl: { type: String, required: false },
  published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
