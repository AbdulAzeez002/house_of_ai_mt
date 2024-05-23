// import mongoose from "mongoose";

// let isConnected = false;
// const connectToMongoDB = () => {
//   if (isConnected) {
//     return;
//   }
//   mongoose
//     .connect(`${process.env.MONGODB_URL}`)
//     .then(() => {
//       isConnected = true;
//       console.log("connected to mongodb");
//     })
//     .catch((e) => {
//       console.log("mongodb not connected",e);
//     });
// };

// export default connectToMongoDB;

import mongoose from "mongoose";

const connectToMongoDB = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectToMongoDB;
