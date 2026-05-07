require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const bukuRoutes = require('./routes/bukuRoutes');
const peminjamanRoutes = require('./routes/peminjamanRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/buku', bukuRoutes);
app.use('/api/peminjaman', peminjamanRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('API Peminjaman Buku Berjalan');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});