import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}