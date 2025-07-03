import User from "../../models/user.js";
import TokenRequest from "../../models/tokenRequest.js";

export const approveRejectTokenRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // approve or reject

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "invalid action" });
    }

    const request = await TokenRequest.findById(requestId).populate("from to");

    if (!request) {
      return res.status(404).json({ message: "Token request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "token already handled" });
    }

    if (action == "reject") {
      request.status = "Rejected";
      await request.save();
      return res
        .status(200)
        .json({ message: "request rejected successfully", request });
    }

    if (request.from.kiloWatts < request.amountInKw) {
      return res
        .status(400)
        .json({ message: "sender has insufficient balance" });
    }

    request.from.kiloWatts -= request.amountInKw;
    request.to.kiloWatts += request.amountInKw;

    await request.from.save();
    await request.to.save();

    request.status = "Approved";
    await request.save();

    return res.status(200).json({ message: "Request approved", request });
  } catch (error) {
    console.error("Request handling error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
