const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const updateUser = async (data) => {
  try {
    const user = await User.findById(data.id);
    if (!user) {
      return false;
    } else {
      user.userName = data.userName || user.userName;
      user.email = data.email || user.email;
      if (data.password) {
        user.password = await bcrypt.hash(data.password, 10);
      }
      await user.save();
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};


module.exports = {
  updateUser,
};