import User from "../../models/user.js";

//controller to create users
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      homeAddress,
      role,
    } = req.body;

    //check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "user already available" });
    }

    //check input validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      phoneNumber ||
      homeAddress ||
      role
    ) {
      return res.status(400).json({ message: "Please fill all the blanks" });
    }

    //check password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password should be of same pattern",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      homeAddress,
      role,
    });
    await newUser.save();
    res.status(0.2).json({
      message: "user account successfull created",
    });
  } catch (error) {
    console.error("error creating user account", error)
    res.status(500).json({ message: "Server error: account creation Failed" });
  }
};
