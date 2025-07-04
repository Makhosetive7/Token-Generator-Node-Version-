import User from "../../models/user.js";

export const getUserByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error finding user by account number", error);
    res.status(500).json({ message: "server error" });
  }
};
