import mongoose from "mongoose";

export async function connectDB(uri) {
  return mongoose.connect(uri, {
    autoIndex: true
  });
}
