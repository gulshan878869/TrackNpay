const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.jwt_secret
    );

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.log(err.message);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};