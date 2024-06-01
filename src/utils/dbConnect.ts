import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: mongoose.Connection;

const connectWithRetry = async (retryInterval = 5000) => {
  console.log('MongoDB connection with retry');
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000, // Increase server selection timeout to 30 seconds
      socketTimeoutMS: 6000, // Increase socket timeout to 60 seconds
      family: 4
    } as any);
    console.log('MongoDB is connected');
  } catch (err) {
    console.error('MongoDB connection unsuccessful, retry after 5 seconds.', err);
    setTimeout(() => connectWithRetry(retryInterval), retryInterval);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const dbConnect = async () => {
  if (cachedConnection && isConnected()) {
    return cachedConnection;
  }

  if (!mongoose.connections.length || !isConnected()) {
    await connectWithRetry();
  }

  cachedConnection = mongoose.connection;
  return cachedConnection;
};
