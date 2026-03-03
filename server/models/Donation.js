import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true
    },
    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [1, "Minimum donation is ₹1"]
    },
    currency: { type: String, default: "INR" },
    message: { type: String, default: "", maxlength: 500 },
    isAnonymous: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
