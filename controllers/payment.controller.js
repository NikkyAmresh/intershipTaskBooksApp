const { PAYMENT_REFERRER_REWARD, Messages } = require("../constants");
const User = require("../models/users.model");

const verifyPayment = (payload) => {
  if (payload) {
    // verify payment payload
  }

  return true;
};

const paymentControllers = {
  paymentHandler: async (req, res) => {
    if (!verifyPayment(req.body)) {
      res.status(400).send({ message: Messages.PAYMENT.FAILED });
      return;
    }

    const { email } = req.body;
    if (!email) {
      res.status(400).send({
        message: Messages.USER_INPUT_ERROR.NOT_ALL_FIELDS_AVAILABLE,
      });
      return;
    }

    if (req.user.email !== email) {
      res.status(400).send({ message: Messages.PAYMENT.UNAUTHORISED_PAYMENT });
      return;
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { isPayementMade: true } }
    );

    const referrerUser = user.referrerUser;
    if (referrerUser) {
      await User.updateOne(
        { _id: referrerUser },
        { $inc: { totalEarnings: PAYMENT_REFERRER_REWARD } }
      );
    }
    res.status(200).send({
      message: referrerUser
        ? Messages.PAYMENT.DONE_AND_REWARDED
        : Messages.PAYMENT.DONE,
    });
  },
};
module.exports = paymentControllers;
