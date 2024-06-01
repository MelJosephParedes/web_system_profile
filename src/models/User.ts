// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface AccountDocument extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

const AccountSchema = new Schema<AccountDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
}, { collection: 'accounts' }); // Specify the collection name

export const AccountModel = mongoose.models.Account || mongoose.model<AccountDocument>('Account', AccountSchema);

