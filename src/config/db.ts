import mongoose from "mongoose";

const connectToMongoDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((e) => {
      console.log("mongodb not connected",e);
    });
};

export default connectToMongoDB;
