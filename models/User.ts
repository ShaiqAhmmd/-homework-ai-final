import mongoose, { Schema, models } from 'mongoose'

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true }, // Clerk user ID or your user identifier
  username: { type: String },
  password: { type: String },
  referralCount: { type: Number, default: 0 },
  isPro: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default models.User || mongoose.model('User', UserSchema)