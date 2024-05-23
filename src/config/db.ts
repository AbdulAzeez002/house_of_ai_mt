import mongoose from "mongoose";

let isConnected = false;
const connectToMongoDB = () => {
  if (isConnected) {
    return;
  }
  mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
      isConnected = true;
      console.log("connected to mongodb");
    })
    .catch((e) => {
      console.log("mongodb not connected",e);
    });
};

export default connectToMongoDB;
