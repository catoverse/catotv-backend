require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 5000;

const loaders = require("./src/loaders");

const startApplication = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(port, (err) => {
    if (err) {
      console.err(err);
      return;
    }
    console.log(`Server running on port ${port}`);
  });
};

startApplication();
