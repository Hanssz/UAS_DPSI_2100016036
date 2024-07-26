const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "hanif");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token ndak valid" });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    console.log("User role:", req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
module.exports = { authenticate, authorize };
