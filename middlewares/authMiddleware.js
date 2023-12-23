const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token not provided",
      });
    }

    const token = authorizationHeader.split(" ")[1];
    console.log("Received Token:", token);

    const decryptedToken = jwt.verify(token, process.env.SECRET);
    console.log("Decrypted Token:", decryptedToken);

    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
