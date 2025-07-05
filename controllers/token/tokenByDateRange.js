import Token from "../../models/token/token.js";

export const getTokensByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const tokens = await Token.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(tokens);
  } catch (error) {
    console.error("Error fetching tokens by date:", error);
    res.status(500).json({ message: "Server error" });
  }
};
