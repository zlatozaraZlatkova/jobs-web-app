const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const User = require("../models/User");

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

module.exports = {
  register,
};
