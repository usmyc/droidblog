const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "this email already taken"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

// static method to login user
// userSchema.static.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect email");
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
