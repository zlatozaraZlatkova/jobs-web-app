const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/User");
const tokenBlackList = new Set();


async function register(name, email, password) {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("Username or Email is already taken");
  }

  const avatar = gravatar.url(email, {
    s: "200",
    r: "aa",
    d: "mm"
  })


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    avatar,
    hashedPassword,
  });

  return createToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email });
  
  if(!user) {
    throw new Error("Incorrect email or password");
  }
  
  const match = await bcrypt.compare(password, user.hashedPassword);

  if(!match) {
    throw new Error("Incorrect email or password");
  }

  return createToken(user);

}

function verifyToken(token) {
  if (tokenBlackList.has(token)) {
    throw new Error("Invalid token!");
  }
  const payloadData = jwt.verify(token, JWT_SECRET);
  return payloadData;
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600000 });

  return {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };
}

module.exports = {
  register,
  verifyToken,
  login
};