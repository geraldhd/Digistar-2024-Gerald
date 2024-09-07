const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const cartRouter = require('./router/cartRouter');
const orderRouter = require('./router/orderRouter');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

module.exports = app;
