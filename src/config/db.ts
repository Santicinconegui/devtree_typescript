import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.bgGreen.black.bold(`MongoDB is connected 👌 ${url}`));
  } catch (err) {
    console.log(colors.bgRed.black.bold(err));
    process.exit(1);
  }
};
