const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/User");
const tokenBlackList = new Set();


async function register(name, email, password, role) {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("Username or Email is already taken");
    // const error = new Error("Username or Email is already taken");
    // console.log('Error type created:', error.name);  
    // throw error;
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
    role
  });

  return createToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password");
    // const error = new Error("Incorrect email or password");
    // console.log('Error type created:', error.name);  
    // throw error;
  }

  const matchedPass = await bcrypt.compare(password, user.hashedPassword);

  if (!matchedPass) {
    throw new Error("Incorrect email or password");
    // const error = new Error("Incorrect email or password");
    // console.log('Error type created:', error.name);  
    // throw error;
  }
  return createToken(user);

}

async function logout(token) {
  tokenBlackList.add(token);
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
    role: user.role
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600000 });

  return {
    _id: user._id,
    email: user.email,
    accessToken: token,
    role: user.role
  };
}

module.exports = {
  register,
  verifyToken,
  login,
  logout
};