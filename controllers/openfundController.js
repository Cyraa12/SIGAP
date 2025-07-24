const openfundModel = require("../models/openfundModel");

exports.getOpenFund = (req, res) => {
  openfundModel.getAllFund((err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).json(results);
  });
};

exports.createOpenFund = (req, res) => {
  const { instansi, tahun, jenis_anggaran, jumlah, realisasi } = req.body;
  const file_laporan = req.file ? `/uploads/laporan/${req.file.filename}` : null;

  const newData = { instansi, tahun, jenis_anggaran, jumlah, realisasi, file_laporan };
  openfundModel.insertFund(newData, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ message: "Data berhasil disimpan" });
  });
};

exports.filterFund = (req, res) => {
  const { tahun, instansi } = req.query;
  openfundModel.getFundByFilter(tahun, instansi, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).json(result);
  });
};

exports.getOpenFundByEmail = (req, res) => {
  const { email } = req.params;

  openfundModel.getInstansiByEmail(email, (err, instansi) => {
    if (err) {
      res.status(500).json({ message: "Gagal mengambil instansi", error: err });
    } else if (!instansi) {
      res.status(404).json({ message: "Instansi tidak ditemukan untuk email ini" });
    } else {
      openfundModel.getFundByInstansi(instansi, (err, data) => {
        if (err) {
          res.status(500).json({ message: "Gagal mengambil data open_fund", error: err });
        } else if (data.length === 0) {
          res.status(404).json({ message: "Data open_fund tidak ditemukan untuk instansi ini" });
        } else {
          res.status(200).json(data);
        }
      });
    }
  });
};

// Ambil aduan berdasarkan instansi user
exports.getFundByInstansi = (req, res) => {
  const instansi = req.params.instansi;
  openfundModel.getFundByInstansi(instansi, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};