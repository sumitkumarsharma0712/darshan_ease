import mongoose from "mongoose";
import Temple from "./models/Temple.js";
import { connectDB } from "./config/db.js";

async function updateImages() {
    await connectDB("mongodb://127.0.0.1:27017/darshanease");
    const temples = await Temple.find({});
    for (let i = 0; i < temples.length; i++) {
        // Use realistic placeholders for each temple
        temples[i].imageUrl = `https://picsum.photos/seed/${temples[i]._id}/800/600`;
        await temples[i].save();
    }
    console.log("Images updated to working Picsum photos.");
    process.exit(0);
}

updateImages();
