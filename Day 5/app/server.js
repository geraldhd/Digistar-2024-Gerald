// app/server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./router/userRoutes'); // Sesuaikan path ini
const orderRoutes = require('./router/orderRoutes');
const cartRoutes = require('./router/cartRoutes');
const app = express();

// Middleware
app.use(express.json());

// Load environment variables from .env (handled in index.js)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digistarDB';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/users', userRoutes); // Apply authMiddleware to routes
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
module.exports = app;
