const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "sample_secret_key";

const register = async (userData) => {
  try {
    const { userName, email, password } = userData;
    if (!userName || !email || !password) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      userName,
      email,
      password: hashedPassword,
    };

    const id = await User.create(user);

    if (id) {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const login = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      //comapre hashed password with the password provided by the user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        let AccessToken = jwt.sign({ id: user._id.toString() }, SECRET_KEY, {
          expiresIn: "1h",
        });
        let RefreshToken = jwt.sign({ id: user._id.toString() }, SECRET_KEY, {
          expiresIn: "7d",
        });

        user.refreshToken = RefreshToken;
        await user.save();

        return {
          success: true,
          AccessToken,
          RefreshToken,
          message: "Login successful",
          user,
        };
      } else {
        return {
          success: false,
          message: "Invalid password",
        };
      }
    }
  } catch (e) {
    return {
      success: false,
      message: "Internal server error",
    };
    console.log(e);
  }
};

const logout = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    user.refreshToken = undefined;
    await user.save();
    return {
      success: true,
      message: "Logout successful",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};


module.exports = {
  register,
  login,
  logout
};
