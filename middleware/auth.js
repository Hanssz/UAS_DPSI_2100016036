// Import library jsonwebtoken
const jwt = require("jsonwebtoken");

// Middleware untuk autentikasi
const authenticate = (req, res, next) => {
  // Mendapatkan token dari header Authorization dan menghapus prefix "Bearer "
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);

  // Jika token tidak ada, kirimkan response status 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verifikasi token menggunakan secret key "hanif"
    const decoded = jwt.verify(token, "hanif");
    // Menyimpan data user yang telah di-decode ke dalam request object
    req.user = decoded;
    // Melanjutkan ke middleware berikutnya
    next();
  } catch (err) {
    // Jika verifikasi token gagal, kirimkan response status 401 (Unauthorized)
    res.status(401).json({ message: "Token ndak valid" });
  }
};

// Middleware untuk otorisasi
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Jika peran user tidak termasuk dalam peran yang diizinkan, kirimkan response status 403 (Forbidden)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // Melanjutkan ke middleware berikutnya
    next();
  };
};

// Mengekspor fungsi authenticate dan authorize agar dapat digunakan di file lain
module.exports = { authenticate, authorize };

