const { application } = require("express");
const express = require("express");
const { render } = require("express/lib/response");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
// express app
const app = express();

//HTML File Send
// app.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });

// Static Page for css and other
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // this encoding important
app.use(cookieParser());

//database connection
const dbURI =
  "mongodb+srv://username:password@exercise.mqmke.mongodb.net/databasename?retryWrites=true&w=majority";
mongoose.connect(dbURI);

// HTML rendering
app.set("view engine", "ejs");

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//basic routes
app.get("/", requireAuth, (req, res) => {
  res.redirect("/blogs");
});

//register-login routes
app.use(userRoutes);
// about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", requireAuth, blogRoutes);

//cookies
app.get("/set-cookies", (req, res) => {
  //res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, { httpOnly: true });
  res.send("you got the cookie");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

// Response Single Text
// app.get("/", (req, res) => {
//   res.send("<p> Home Page </p>");
// });

// Response JSON Block
// app.get("/send", (req, res) => {
//   res.send({ ahmet: "konya", burak: "antalya" });
// });

// Middleware example
// const myLogger = (req, res, next) => {
//   console.log("Logged");
//   next();
// };

// app.use(myLogger);

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

//404 Page
app.use((req, res) => {
  res.render("404", { title: "Error" });
});

// listen for request
app.listen(3000);
