const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

mongoose.set('strictQuery', false);

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = mongoose;
