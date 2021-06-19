const jwt = require("jsonwebtoken");
const Manager = require("../models/manager");
const User = require("../models/user")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const manager = await Manager.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    })
    // console.log(token)
    if (!manager && !user) {
      throw new Error();
    }
    if (manager) {
    req.manager = manager;
    req.token = token;
    }
    if (user) {
      req.user = user;
      req.token = token;
    }
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
