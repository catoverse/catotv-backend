const mongoose = require("mongoose");


module.exports = async () => {
  const db = process.env.MONGO_URI;
  const connection = await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  
  // maybe: connection.connection.db
  // see documentaion
  return connection;
}