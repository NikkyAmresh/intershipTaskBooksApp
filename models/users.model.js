const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { sign } = require("../helper/jwt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
  },

  referrerUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },

  isPayementMade: {
    type: Boolean,
    Default: false,
  },

  totalEarnings: {
    type: Number,
    default: 0,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = sign({
    id: user._id.toString(),
    email: user.email,
  });
  return token;
};

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.authenticate = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const user = mongoose.model("User", UserSchema);

module.exports = user;
