const userServices = require("../services/user.services");

const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await userServices.updateUser(data);
    if (result) {
      res.status(200).json({ message: "User updated successfully", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", success: false });
  }
};

module.exports = {
  updateUser,
};