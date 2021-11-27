const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");


module.exports = async (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(auth);

  return app;
}