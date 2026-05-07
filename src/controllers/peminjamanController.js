const Peminjaman = require('../models/peminjaman');
const Buku = require('../models/buku');

// GET semua peminjaman
exports.getAllPeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.find().populate('id_buku');
        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET peminjaman berdasarkan ID
exports.getPeminjamanById = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id)
            .populate('id_buku');

        if (!peminjaman) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST tambah peminjaman
exports.createPeminjaman = async (req, res) => {
    try {
        const buku = await Buku.findById(req.body.id_buku);

        if (!buku) {
            return res.status(404).json({
                message: 'Buku tidak ditemukan'
            });
        }

        if (buku.stok <= 0) {
            return res.status(400).json({
                message: 'Stok buku habis'
            });
        }

        // Kurangi stok buku
        buku.stok -= 1;
        await buku.save();

        const peminjaman = await Peminjaman.create(req.body);

        res.status(201).json({
            message: 'Peminjaman berhasil',
            peminjaman
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update peminjaman
exports.updatePeminjaman = async (req, res) => {
    try {
        const peminjamanLama = await Peminjaman.findById(req.params.id);

        if (!peminjamanLama) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        // Jika sebelumnya false lalu diubah menjadi true
        if (
            peminjamanLama.is_return === false &&
            req.body.is_return === true
        ) {
            const buku = await Buku.findById(peminjamanLama.id_buku);

            if (buku) {
                buku.stok += 1;
                await buku.save();
            }
        }

        const peminjaman = await Peminjaman.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: 'Data peminjaman berhasil diupdate',
            peminjaman
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE peminjaman
exports.deletePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findByIdAndDelete(req.params.id);

        if (!peminjaman) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Data peminjaman berhasil dihapus'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};