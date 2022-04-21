const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", userController.user_create);

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", userController.user_login);
router.get("/logout", userController.user_logout);

module.exports = router;
