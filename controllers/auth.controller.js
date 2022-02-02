const User = require("../models/users.model");
const { Messages } = require("../constants");
const authControllers = {
  create: async (req, res) => {
    const { name, email, password, referrerUserEmail } = req.body;
    if (!(email && password && name)) {
      res.status(400).send({
        message: Messages.USER_INPUT_ERROR.NOT_ALL_FIELDS_AVAILABLE,
      });
      return;
    }
    let newUser = await User.findOne({ email });
    if (newUser) {
      res.status(200).send({
        message: Messages.USER.EMAIL_ALREADY_EXISTS,
        email: newUser.email,
      });
      return;
    }

    let referrerUser = await User.findOne({ email: referrerUserEmail });
    referrerUser = referrerUser ? referrerUser._id : null;
    const user = await new User({
      name,
      email,
      password,
      referrerUser,
    }).save();

    const token = user.generateAuthToken();
    res.status(201).send({ token });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        message: Messages.USER_INPUT_ERROR.NOT_ALL_FIELDS_AVAILABLE,
      });
      return;
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({
        message: Messages.USER.ACCOUNT_NOT_FOUND,
      });
      return;
    }

    const doesPasswordMatch = await user.authenticate(password);
    if (!doesPasswordMatch) {
      res.status(401).send({
        message: Messages.USER.INVALID_CREDS,
      });
      return;
    }
    const token = user.generateAuthToken();
    res.status(201).send({ token });
  },

  isLoggedIn: (req, res) => {
    if (req.user.id) {
      return res
        .status(200)
        .send({ message: Messages.LOGIN.LOGGED_IN(req.user.email) });
    } else {
      return res.status(401).send({ message: Messages.LOGIN.NOT_LOGGED_IN });
    }
  },

  profile: async (req, res) => {
    let user = await User.findOne(
      { _id: req.user.id },
      { password: 0, __v: 0 }
    ).populate({ path: "referrerUser", select: ["_id", "name", "email"] });
    res.status(200).send({ user });
  },
};
module.exports = authControllers;
