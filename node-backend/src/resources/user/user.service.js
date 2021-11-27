//Mongo models
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-express");

class UserService {
  googleLogin = async (body) => {
    try {
      let user = await User.findOne({ google_id: body.google_id });
      let account = {};

      if (user) {
        Object.assign(user, body);
        account = await user.save();
      } else {
        //create new user
        let newUser = new User(body);
        account = await newUser.save();
      }
      let token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, {});
      return { token, user: account };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  generateNewToken = async (user) => {
    try {
      let newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {});
      let account = await User.findById(user.id);

      return { token: newToken, user: account };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  user = async (id) => {
    try {
      let user = await User.findById(id);
      if (!user) throw new ApolloError("User not found", 404);
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  setRole = async (role, id) => {
    try {
      let user = await User.findById(id);
      if (user.role == role) {
        return user;
      } else {
        user.role = role;
        await user.save();
        return user;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

module.exports = new UserService();
