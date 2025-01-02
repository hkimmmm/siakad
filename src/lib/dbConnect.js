import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const mongodbURI = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

console.log(mongodbURI); // Menampilkan URI MongoDB di console
console.log(jwtSecret);

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
};

export default dbConnect;
