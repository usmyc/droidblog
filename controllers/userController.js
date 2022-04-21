const { request } = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "droid secret", {
    expiresIn: maxAge,
  });
};

const user_create = (req, res) => {
  const user = new User(req.body);
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  user
    .save()
    .then((result) => {
      //res.status(201).json({ user: user._id });
      res.redirect("/login"); //--> we can send 1 respond for 1 request
    })
    .catch((err) => {
      res.status(400).send(JSON.stringify(err.message));
    });
};

const user_login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // try {
  //   const user = await User.login(email, password);
  //   res.send(201).json({ user: user._id });
  // } catch (err) {
  //   res.send(err);
  // }
  User.find({ email: email, password: password })
    .then((result) => {
      if (result != 0) {
        const token = createToken(User._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        //res.status(201).json({ user: user1._id });
        res.render("newblog", { title: "New Blog" });
      } else {
        res.redirect("404");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { user_create, user_login, user_logout };
