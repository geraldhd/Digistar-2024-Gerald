const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const app = require('./app/server'); // Pastikan ini mengarah ke server.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
