import Tokens from "../../models/token/token.js";

export const getTokensById = async (req, res) => {
  try {
    const { tokenId } = req.params;

    const tokens = await Tokens.findById(tokenId).populate("accountNumber");

    if (!tokens) {
      return res.status(404).json({ message: "Tokens can not be found by Id" });
    }

    res.status(200).json(tokens);
  } catch (error) {
    console.error("Error fetching token by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
