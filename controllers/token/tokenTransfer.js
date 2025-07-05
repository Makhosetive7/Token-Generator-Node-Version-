import User from "../../models/user/user.js";
import TokenTransfer from "../../models/token/tokenTransfer.js";

export const createTransferToken = async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amountInKw, note } =
      req.body;

    if (!senderAccountNumber || !receiverAccountNumber || !amountInKw) {
      return res.status(400).json({ message: "missing fields required" });
    }

    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    const receiver = await User.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ message: "sender or receiver account is not found" });
    }

    if (sender.kiloWatts < amountInKw) {
      return res
        .status(400)
        .json({ message: "not enough killowats to make transfer" });
    }

    sender.kiloWatts -= amountInKw;
    receiver.kiloWatts += amountInKw;

    await sender.save();
    await receiver.save();

    const transferRecord = new TokenTransfer({
      sender: sender._id,
      receiver: receiver._id,
      amountInKw,
      note,
    });

    await transferRecord.save();

    res.status(200).json({
      message: "Token transfer successful",
      transfer: transferRecord,
    });
  } catch (error) {
    console.error("transfer error", error);
    res.status(500).json({ message: "server error" });
  }
};
