const authService = require("../services/index").authService;

const registerController = async (req, res) => {
  try {
    const response = await authService.register(req.body);
    if (response) {
      res
        .status(200)
        .json({ message: "User registered successfully", success: true });
    } else {
      res.status(400).json({ message: "Registration failed", success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const loginController = async (req, res) => {
  try {
    const response = await authService.login(req.body);

    if (response.success) {
      res.cookie("refreshToken", response.RefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.status(200).send({
        accessToken: response.AccessToken,
        message: response.message,
        user: response.user,
        success: true,
      });
    } else {
      res.status(400).json({ message: response.message, success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const logoutController = async (req, res) => {
  try {
    const response = await authService.logout(req.body.id);  

    if (response.success) {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: response.message, success: true });
    } else {
      res.status(400).json({ message: response.message, success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
