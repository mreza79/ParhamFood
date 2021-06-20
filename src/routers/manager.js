const express = require("express");
const redis = require("redis");
const Manager = require("../models/manager");
const Restaurant = require("../models/restaurant");
const auth = require("../middleware/auth");
const router = new express.Router();

//create manager
router.post("/managers", async (req, res) => {
  // const { manager } = req.body
  const email = req.body.email;
  const password = req.body.password;
  const restaurant = new Restaurant(req.body.restaurant);
  console.log(req.body)
  await restaurant.save();
  try {
    const manager = new Manager({ email, password, restaurant });

    await manager.save();
    // const _id = manager.restaurant._id //restaurant id
    const token = await manager.generateAuthToken();

    // restaurant id
    res.status(200).send({ manager, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// login manager
router.post("/managers/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Manager.findByCredentials(email, password);
    const token = await manager.generateAuthToken();
    // res.cookie("access_token", token, {
    //   // secure: true,
    //   httpOnly: true,
    // });
    // redis.set(
    //   user_id,
    //   JSON.stringify({
    //     refresh_token: refresh_token,
    //     expires: refresh_token_maxage,
    //   }),
    //   redis.print
    // );
    res.status(200).send({ manager, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//logout current manager in session
router.post("/managers/logout", auth, async (req, res) => {
  try {
    req.manager.tokens = req.manager.tokens.filter(
      (token) => token.token !== req.token
    );
    // redis.del(req.body._id);
    // res.clearCookie("access_token");
    await req.manager.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//logout all sessions that have a specific manager
router.post("/managers/logoutAll", auth, async (req, res) => {
  try {
    req.manager.tokens = [];
    await req.manager.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//get current manager !!!
router.get("/managers/me", auth, async (req, res) => {
  res.send(req.manager);
});

//Add comment to user
router.post("/manager/comments/:id", auth, async (req, res) => {
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

//edit manager by email, password, restaurant
/* router.patch("/managers/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "restaurants"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid Updates!" });

  try {
    updates.forEach((update) => (req.manager[update] = req.body[update]));
    await req.manager.save();
    res.send(req.manager);
  } catch (e) {
    res.status(400).send(e);
  }
}); */

//delete manager in session
router.delete("/managers/me", auth, async (req, res) => {
  try {
    await req.manager.remove();
    res.send(req.manager);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
