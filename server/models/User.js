const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emailOrMobile: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
