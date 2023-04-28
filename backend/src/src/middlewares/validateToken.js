const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).json({ code: "MT1100" });
  try {
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    req.id = id;
  } catch (error) {
    return res.status(307).json({ code: "MT1101" });
  }
  next();
};

module.exports = validateToken;
