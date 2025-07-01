import User from "../../models/user.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //email validation
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Failing to find user account",
      });
    }

    //password validation
    if (user.password !== password) {
      return res.status(400).json({
        message: "Password is wrong",
      });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        accountNumber: user.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("error is found");
    res.status(500).json({ message: "server error " });
  }
};
