const auth = require("../controllers/auth.controller");
module.exports = (app) => {
  app.post("/register", auth.create);
  app.post("/login", auth.login);
};
