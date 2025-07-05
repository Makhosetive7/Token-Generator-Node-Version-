import Tokens from "../../models/token/token.js";

export const getTokensByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const token = await Tokens.findOne({ accountNumber });

    if (!token) {
      return res
        .status(404)
        .json({ message: "Failed to find token by account number" });
    }

    res.status(200).json(token);
  } catch (error) {
    console.log("error finding token by account number", error);
    res.status(500).json({ message: "server error" });
  }
};
