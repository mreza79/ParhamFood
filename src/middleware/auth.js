const jwt = require("jsonwebtoken");
const Manager = require("../models/manager");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const manager = await Manager.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(token)
    if (!manager) {
      throw new Error();
    }

    req.manager = manager;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
