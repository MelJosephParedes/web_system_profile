// utils/dbConnect.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: mongoose.Connection;

export const dbConnect = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!mongoose.connections.length) {
        await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
        socketTimeoutMS: 60000, // Increase socket timeout to 60 seconds
        family: 4
      } as any);
      
  }

  cachedConnection = mongoose.connection;
  return cachedConnection;
};
