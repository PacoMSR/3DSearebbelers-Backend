const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and send response
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    // Handle duplicate key error (username or email already exists)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const message = field === 'username'
        ? 'Username already exists. Please choose a different username.'
        : 'Email already exists. Please use a different email address.';
      return res.status(409).json({ error: message, field: field });
    }
    // Handle other errors
    res.status(500).json({ error: "An error occurred during registration. Please try again." });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password!");

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password!");

    // send successful response
    res.status(200).json({ _id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
