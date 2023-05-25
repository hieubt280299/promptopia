import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("No MongoDB URI");
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error: ", error);
  }
};
