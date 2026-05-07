const Buku = require('../models/buku');

// GET semua buku
exports.getAllBuku = async (req, res) => {
    try {
        const buku = await Buku.find();
        res.status(200).json(buku);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET buku berdasarkan ID
exports.getBukuById = async (req, res) => {
    try {
        const buku = await Buku.findById(req.params.id);

        if (!buku) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.status(200).json(buku);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST tambah buku
exports.createBuku = async (req, res) => {
    try {
        const buku = await Buku.create(req.body);
        res.status(201).json(buku);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT edit buku
exports.updateBuku = async (req, res) => {
    try {
        const buku = await Buku.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!buku) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.status(200).json(buku);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE buku
exports.deleteBuku = async (req, res) => {
    try {
        const buku = await Buku.findByIdAndDelete(req.params.id);

        if (!buku) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};