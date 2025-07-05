import User from "../../models/user/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const { email, password } = req.body;

    //email validation
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Failing to find user account",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: "Invalid password please try again" });
    }

    const tokenGenerated = jwt.sign(
      { email: user.email, firstName: user.firstName },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Login success
    res.status(200).json({
      message: "Login successful",
      tokenGenerated,
      user: {
        id: user._id,
        email: user.email,
        accountNumber: user.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
     console.error("Login error:", error.message);
    res.status(500).json({ message: "server error " });
  }
};
