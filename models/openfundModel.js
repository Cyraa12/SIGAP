const db = require("../config/database");

exports.getAllFund = (result) => {
  db.query("SELECT * FROM open_fund ORDER BY tahun DESC", (err, res) => {
    result(err, res);
  });
};

exports.insertFund = (data, result) => {
  db.query("INSERT INTO open_fund SET ?", data, (err, res) => {
    result(err, res);
  });
};

exports.getFundByFilter = (tahun, instansi, result) => {
  db.query("SELECT * FROM open_fund WHERE tahun = ? AND instansi = ?", [tahun, instansi], (err, res) => {
    result(err, res);
  });
};

// Ambil instansi berdasarkan email
exports.getInstansiByEmail = (email, result) => {
  const query = "SELECT instansi FROM users WHERE email = ?";
  db.query(query, [email], (err, res) => {
    if (err) return result(err, null);
    if (res.length === 0) return result(null, null); // email tidak ditemukan
    result(null, res[0].instansi);
  });
};

// Ambil data open_fund berdasarkan instansi
exports.getFundByInstansi = (instansi, result) => {
  const query = "SELECT * FROM open_fund WHERE instansi = ?";
  db.query(query, [instansi], (err, res) => {
    result(err, res);
  });
};

exports.getAduanByEmail = (email, result) => {
  const query = `
    SELECT a.*, u.nama, u.instansi 
    FROM aduan a
    INNER JOIN users u ON a.email = u.email
    WHERE a.email = ?
    ORDER BY a.created_at DESC
  `;
  db.query(query, [email], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};
