const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const Restaurant = require("../models/restaurant");
const router = new express.Router();

//Create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const date = new Date(2022, 3, 21);
  if (Date.now() <= date) {
    user.cash += 1000000;
  }

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login user
router.post("/users/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findByCredentials(phoneNumber, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//get restaurants for user
router.get("/users/restaurants", auth, async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send({ restaurants });
  } catch (e) {
    res.status(500).send(e);
  }
});

//Logout user session
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//Logout All user --remove jwt
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//Optional
//Get this user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//edit user by name, phone number, password, address, region
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phoneNumber",
    "password",
    "address",
    "region",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid Updates!" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add comment to restaurant route!!!!!!!
router.post("/user/comments/:id", auth, async (req, res) => {
  const id = req.params.id; //restaurant id
  const { userComment, rate } = req.body;
  const comment = new Comment({
    userName: req.user.name,
    userComment,
    rate,
    restaurant: id,
  });
  try {
    await comment.save();
    res.status(201).send({ comment });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
