const jwt = require("jsonwebtoken");
const UserModel = require("../resources/user/user.model");

async function auth(req, res, next) {
  let user = null;
  try {
    const token = req.header("x-auth-token");
    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);

      if (!(await UserModel.findById(user.id))) {
        return res.status(404).json({ message: "User not found" });
      }
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;
