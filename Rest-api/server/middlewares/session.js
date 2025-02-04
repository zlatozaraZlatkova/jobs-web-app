const { verifyToken } = require("../services/authService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const payload = verifyToken(token);

      req.user = payload;

    } catch (err) {
      res.clearCookie('jwt');
      return res.status(401).json({ message: "Invalid authorization token" });
    }
  }

  next();
};