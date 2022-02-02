const paymentController = require("../controllers/payment.controller");
const auth = require("./../controllers/auth.controller");
const Token = require("../middleware/auth");
const { AREA } = require("../constants");
module.exports = (app) => {
  const token = new Token(AREA.USER);
  app.use(token.verify);
  app.get("/", auth.isLoggedIn);
  app.put("/paymentHandler", paymentController.paymentHandler);
};
