require('dotenv').config();
const express = require('express');
const userRouter = require('../router/userRouter');

const app = express();
app.use(express.json());

// Use the user router
app.use('/', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
