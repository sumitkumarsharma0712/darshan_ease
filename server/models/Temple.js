import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Temple name is required"],
      trim: true,
      maxlength: 100
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: 200
    },
    description: { type: String, default: "", maxlength: 2000 },
    deity: { type: String, default: "", trim: true },
    imageUrl: { type: String, default: "" },
    timings: { type: String, default: "" },
    contactInfo: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

templeSchema.index({ name: "text", location: "text", deity: "text" });

export default mongoose.model("Temple", templeSchema);
