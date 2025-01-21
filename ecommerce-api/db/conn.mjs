//imports
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// global configuration
const mongoURL = process.env.ATLAS_URI;
const db = mongoose.connection;

if (!mongoURL) {
  console.error('MongoDB connection string is not defined in environment variables');
  process.exit(1);
}

// connect to mongo
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

export default db;
