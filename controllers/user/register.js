import User from "../../models/user/user.js";
import bcrypt from "bcryptjs";

//controller to create users
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      homeAddress,
      vendorType,
      donationType,
      role,
    } = req.body;

    //check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "user already available" });
    }

    //basic input validation for token buyer
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required" });
    }

    //role specific validation
    if (role === "tokenBuyer") {
      if (!firstName || !lastName || !phoneNumber || !homeAddress) {
        return res
          .status(400)
          .json({ message: "All token buyer fields are required" });
      }
    }

    if (role === "vendor") {
      if (!vendorType || !firstName) {
        return res
          .status(400)
          .json({ message: "Vendor type and name are required" });
      }
    }

    if (role === "donation") {
      if (!donationType) {
        return res.status(400).json({ message: "Donation type is required" });
      }
    }

    //check password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password should be of same pattern",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword,
      phoneNumber,
      homeAddress,
      vendorType,
      donationType,
      role,
    });
    await newUser.save();
    console.log("user created successfully");
    res.status(200).json({
      message: "user account successfull created",
    });
  } catch (error) {
    console.error("error creating user account", error);
    res.status(500).json({ message: "Server error: account creation Failed" });
  }
};
