// app/server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../app/router/userRouters');

const app = express();

// Middleware
app.use(express.json());

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digistarDB';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/users', userRoutes);

module.exports = app;
