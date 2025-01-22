const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");


const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

async function register(name, email, password) {
  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingEmail) {
    throw new Error("Username or Email is already taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const user = await User.create({
    name,
    email,
    avatar,
    hashedPassword,
  });

  const token = createToken(user);
  return token;
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

  return {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };
}

module.exports = {
  register,
};
