import mongoose from "mongoose";

const darshanSlotSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true,
      index: true
    },
    date: { type: String, required: [true, "Date is required"] },
    startTime: { type: String, required: [true, "Start time is required"] },
    endTime: { type: String, required: [true, "End time is required"] },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"]
    },
    availableSeats: {
      type: Number,
      required: true,
      min: [0, "Available seats cannot be negative"]
    },
    price: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "FULL"],
      default: "OPEN"
    }
  },
  { timestamps: true }
);

darshanSlotSchema.index({ temple: 1, date: 1, startTime: 1 });

export default mongoose.model("DarshanSlot", darshanSlotSchema);
